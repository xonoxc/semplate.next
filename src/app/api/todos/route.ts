import { db } from "@/db/dirzzle"
import { todos } from "@/db/schema"
import { auth } from "@clerk/nextjs/server"
import { count, desc, eq, ilike } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { users } from "@/db/schema"

const ITEMS_PER_PAGE = 10

export async function GET(req: NextRequest) {
    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get("page") || "1")
    const search = searchParams.get("search")

    try {
        const [results] = await db
            .select()
            .from(todos)
            .orderBy(desc(todos.createdAt))
            .where(eq(todos.userId, userId))
            .offset((page - 1) * ITEMS_PER_PAGE)
            .limit(ITEMS_PER_PAGE)

        const [itemsCount] = await db
            .select({ count: count() })
            .from(todos)
            .where(ilike(todos.title, `%${search}%`))

        const totalPages = Math.ceil(itemsCount.count / ITEMS_PER_PAGE)

        return NextResponse.json({
            todos: results,
            currentPage: page,
            totalPages,
        })
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}

export async function POST(req: NextRequest) {
    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const results = await db
        .select({
            user: users,
            todos: todos,
        })
        .from(users)
        .leftJoin(todos, eq(users.id, todos.userId))
        .where(eq(users.id, userId))

    console.log("User", results[0].user)

    if (!results[0].user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
    }
    const userTodos = results
        .map(row => row.todos)
        .filter(todo => todo !== null)

    if (!results[0].user.isSubscribed && userTodos.length >= 3) {
        return NextResponse.json(
            {
                error: "Free users can only create up to 3 todos. Please subscribe for more.",
            },
            { status: 403 }
        )
    }

    const { title, content } = await req.json()

    const newTodo = await db.insert(todos).values({
        title,
        content,
        userId,
    })

    if (!newTodo) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }

    return NextResponse.json(newTodo, { status: 201 })
}

import { db } from "@/db/dirzzle"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"
import { todos } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const { completed } = await req.json()
        const todoId = params.id

        const [todo] = await db
            .selectDistinct()
            .from(todos)
            .where(eq(todos.id, todoId))

        if (!todo) {
            return NextResponse.json(
                { error: "Todo not found" },
                { status: 404 }
            )
        }

        if (todo.userId !== userId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }

        const updatedTodo = await db
            .update(todos)
            .set({ completed })
            .where(eq(todos.id, todoId))

        return NextResponse.json(updatedTodo)
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}

export async function DELETE(
    _: NextRequest,
    { params }: { params: { id: string } }
) {
    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const todoId = params.id

        const [todo] = await db
            .selectDistinct()
            .from(todos)
            .where(eq(todos.id, todoId))

        if (!todo) {
            return NextResponse.json(
                { error: "Todo not found" },
                { status: 404 }
            )
        }

        if (todo.userId !== userId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }

        await db.delete(todos).where(eq(todos.id, todoId))

        return NextResponse.json({ message: "Todo deleted successfully" })
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}

import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { db } from "@/db/dirzzle"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function POST() {
    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const [user] = await db.select().from(users).where(eq(users.id, userId))

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            )
        }

        const subscriptionEnds = new Date()
        subscriptionEnds.setMonth(subscriptionEnds.getMonth() + 1)

        await db
            .update(users)
            .set({
                isSubscribed: true,
                subscribtionEnds: subscriptionEnds,
            })
            .where(eq(users.id, userId))

        return NextResponse.json({
            message: "Subscription successful",
            subscriptionEnds,
        })
    } catch (error) {
        console.error("Error updating subscription:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}

export async function GET() {
    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const [user] = await db
            .select({
                subscriptionEnds: users.subscribtionEnds,
                isSubscribed: users.isSubscribed,
            })
            .from(users)
            .where(eq(users.id, userId))

        if (!user) {
            return NextResponse.json(
                {
                    message: "User not found",
                },
                { status: 404 }
            )
        }

        const now = new Date()

        if (user.subscriptionEnds && user.subscriptionEnds < now) {
            await db
                .update(users)
                .set({
                    isSubscribed: false,
                    subscribtionEnds: null,
                })
                .where(eq(users.id, userId))

            return NextResponse.json(
                { isSubscribed: false, subscribtionEnds: null },
                { status: 200 }
            )
        }

        return NextResponse.json({
            isSubscribed: user.isSubscribed,
            subscribtionEnds: user.subscriptionEnds,
        })
    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}

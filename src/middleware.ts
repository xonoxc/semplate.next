//@ts-ignore: depricated authMiddleware usage
import { authMiddleware, clerkClient } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

const publicRoutes = ["/", "/sign-in", "/sign-up"]

export default authMiddleware({
    publicRoutes,
    async afterAuth(auth: { userId: string }, req: NextRequest) {
        // not authenticated & trying to access private routes
        if (!auth.userId && !publicRoutes.includes(req.nextUrl.pathname))
            return NextResponse.redirect(new URL("/sign-in", req.url))

        if (auth.userId) {
            try {
                const user = await (clerkClient as any).users.getUser(
                    auth.userId
                )
                const role = user.publicMetadata.role as string | undefined

                if (role === "admin" && req.nextUrl.pathname === "/dashboard") {
                    return NextResponse.redirect(new URL("/dashboard", req.url))
                }

                if (
                    role !== "admin" &&
                    req.nextUrl.pathname.startsWith("/admin")
                ) {
                    return NextResponse.redirect(new URL("/dashboard", req.url))
                }

                if (publicRoutes.includes(req.nextUrl.pathname)) {
                    return NextResponse.redirect(
                        new URL(
                            role === "admin"
                                ? "/admin/dashboard"
                                : "/dashboard",
                            req.url
                        )
                    )
                }
            } catch (error: any) {
                console.error("Error while fetching user: ", error)
                return NextResponse.redirect(new URL("/sign-in", req.url))
            }
        }
    },
})

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
    ],
}

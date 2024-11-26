import { ClerkMiddlewareAuth, clerkMiddleware } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

const publicRoutes = ["/sign-in", "/sign-up", "/api/webhook/register"]

export default clerkMiddleware(
    async (auth: ClerkMiddlewareAuth, req: NextRequest) => {
        try {
            const { userId, sessionClaims } = await auth()

            const role = sessionClaims?.roleMetadata.role

            if (!userId && !publicRoutes.includes(req.nextUrl.pathname)) {
                return NextResponse.redirect(new URL("/sign-in", req.url))
            }

            if (userId) {
                if (role === "admin" && req.nextUrl.pathname === "/dashboard") {
                    return NextResponse.redirect(
                        new URL("/admin/dashboard", req.url)
                    )
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
            }
        } catch (error) {
            console.error("Error while fetching user: ", error)
            return NextResponse.redirect(new URL("/sign-in", req.url))
        }
    }
)

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
    ],
}

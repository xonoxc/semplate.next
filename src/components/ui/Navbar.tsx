"use client"

import Link from "next/link"
import { useUser, useClerk } from "@clerk/nextjs"
import { LogOut, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function Navbar() {
    const { user } = useUser()
    const { signOut } = useClerk()

    return (
        <nav className="bg-zinc-900 border-b border-zinc-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link
                            href="/"
                            className="flex-shrink-0 flex items-center"
                        >
                            <span className="ml-2 text-xl font-bold text-white">
                                SemplateDotNext
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center">
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="relative h-8 w-8 rounded-full"
                                    >
                                        <Avatar>
                                            <AvatarImage
                                                src={user.imageUrl}
                                                alt="User avatar"
                                            />
                                            <AvatarFallback className="bg-zinc-700 text-zinc-200">
                                                {user.firstName?.charAt(0) ||
                                                    "U"}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="bg-zinc-800 border-zinc-700"
                                >
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href="/subscribe"
                                            className="flex items-center text-zinc-200 hover:text-white hover:bg-zinc-700"
                                        >
                                            <CreditCard className="mr-2 h-4 w-4" />
                                            <span>Subscribe</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => signOut()}
                                        className="text-zinc-200 hover:text-white hover:bg-zinc-700"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Sign out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <>
                                <Button
                                    variant="ghost"
                                    asChild
                                    className="mr-2 text-zinc-300 hover:text-white hover:bg-zinc-800"
                                >
                                    <Link href="/sign-in">Sign In</Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    asChild
                                    className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white border-zinc-700"
                                >
                                    <Link href="/sign-up">Sign Up</Link>
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

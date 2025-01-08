import { Logo } from "@/components/Logo"
import Link from "next/link"

export default function Header() {
    return (
        <header className="bg-white shadow-sm">
            <nav
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                aria-label="Top"
            >
                <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
                    <div className="flex items-center">
                        <Logo />
                        <div className="hidden ml-10 space-x-8 lg:block">
                            <Link
                                href="#features"
                                className="text-base font-medium text-gray-500 hover:text-gray-900"
                            >
                                Features
                            </Link>
                            <Link
                                href="#pricing"
                                className="text-base font-medium text-gray-500 hover:text-gray-900"
                            >
                                Pricing
                            </Link>
                        </div>
                    </div>
                    <div className="ml-10 space-x-4">
                        <>
                            <Link href="/sign-in">
                                <button className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75">
                                    Sign in
                                </button>
                            </Link>
                            <Link href="/sign-up">
                                <button className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50">
                                    Sign up
                                </button>
                            </Link>
                        </>
                    </div>
                </div>
            </nav>
        </header>
    )
}

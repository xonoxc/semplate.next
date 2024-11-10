"use client"

import { useSignIn } from "@clerk/nextjs"
import { FormEvent } from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"

interface SignUpFormCredentails {
    emailAddress: string
    password: string
}

export default function SignIn() {
    const { isLoaded, signIn, setActive } = useSignIn()
    const [credentials, setCredentials] = useState<SignUpFormCredentails>({
        emailAddress: "",
        password: "",
    })
    const [error, setError] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const router = useRouter()

    if (!isLoaded) {
        return null
    }

    async function submit(e: FormEvent) {
        setError("")
        e.preventDefault()
        if (!isLoaded) return

        const { emailAddress, password } = credentials

        if (emailAddress === "" || password === "") {
            setError("All fields are required")
        }

        try {
            const response = await signIn.create({
                identifier: emailAddress,
                password,
            })

            if (response.status === "complete") {
                await setActive({ session: response.createdSessionId })
                router.push("/dashboard")
            } else {
                console.error(JSON.stringify(response, null, 2))
            }
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2))
            setError(err.errors[0].message)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        Sign In to Todo Master
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                value={credentials.emailAddress}
                                onChange={e =>
                                    setCredentials(prev => ({
                                        ...prev,
                                        emailAddress: e.target.value,
                                    }))
                                }
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={credentials.password}
                                    onChange={e =>
                                        setCredentials(prev => ({
                                            ...prev,
                                            password: e.target.value,
                                        }))
                                    }
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-2 top-1/2 -translate-y-1/2"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4 text-gray-500" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-gray-500" />
                                    )}
                                </button>
                            </div>
                        </div>
                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <Button type="submit" className="w-full">
                            Sign In
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="justify-center">
                    <p className="text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/sign-up"
                            className="font-medium text-primary hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}

"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { AlertTriangle, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import BackButton from "@/components/ui/BackButton"

export default function SubscriblePage(): JSX.Element {
    const router = useRouter()
    const { toast } = useToast()
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false)
    const [subscriptionEnds, setSubscriptionEnds] = useState<string | null>()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const fetchSubscriptionStatus = useCallback(async (): Promise<void> => {
        setIsLoading(true)
        try {
            const response = await fetch("/api/subscription")
            if (response.ok) {
                const data = await response.json()
                setIsSubscribed(data.isSubscribed)
                setSubscriptionEnds(data.subscriptionEnds)
            } else {
                throw new Error("Failed to fetch subscription status")
            }
        } catch (error) {
            toast({
                title: "Error",
                description:
                    "Failed to fetch subscription status. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }, [toast])

    useEffect(() => {
        fetchSubscriptionStatus()
    }, [fetchSubscriptionStatus])

    const handleSubscribe = async (): Promise<void> => {
        try {
            const response = await fetch("/api/subscription", {
                method: "POST",
            })

            if (response.ok) {
                const data = await response.json()
                setIsSubscribed(true)
                setSubscriptionEnds(data.subscriptionEnds)
                router.refresh()
                toast({
                    title: "Success",
                    description: "You have successfully subscribed!",
                })
            } else {
                const errData = await response.json()
                throw new Error(errData.error || "Failed to subscribe")
            }
        } catch (error) {
            toast({
                title: "Error",
                description:
                    error instanceof Error
                        ? error.message
                        : "An error occurred while subscribing. Please try again.",
                variant: "destructive",
            })
        }
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center">Loading...</div>
        )
    }

    return (
        <div className="container mx-auto p-4 max-w-3xl">
            <BackButton />
            <h1 className="text-3xl font-bold mb-8 text-center">
                Subscription
            </h1>
            <Card>
                <CardHeader>
                    <CardTitle>Your Subscription Status</CardTitle>
                </CardHeader>
                <CardContent>
                    {isSubscribed ? (
                        <Alert>
                            <CheckCircle className="h-4 w-4" />
                            <AlertDescription>
                                You are a subscribed user. Subscription ends on{" "}
                                {new Date(
                                    subscriptionEnds!
                                ).toLocaleDateString()}
                            </AlertDescription>
                        </Alert>
                    ) : (
                        <>
                            <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertDescription>
                                    You are not currently subscribed. Subscribe
                                    now to unlock all features!
                                </AlertDescription>
                            </Alert>
                            <Button onClick={handleSubscribe} className="mt-4">
                                Subscribe Now
                            </Button>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

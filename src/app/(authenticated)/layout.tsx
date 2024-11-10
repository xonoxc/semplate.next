import Navbar from "@/components/ui/Navbar"

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

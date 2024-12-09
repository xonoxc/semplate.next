import { useCallback, useState } from "react"
import { InsertTodo } from "@/db/schema"
import { Button } from "@/components/ui/button"
import { Trash2, CheckCircle, XCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface TodoItemProps {
    todo: InsertTodo
    isAdmin?: boolean
    onUpdate: (id: string, completed: boolean) => void
    onDelete: (id: string) => void
}

export function TodoItem({
    todo,
    isAdmin = false,
    onUpdate,
    onDelete,
}: TodoItemProps) {
    const [isCompleted, setIsCompleted] = useState<boolean>(
        todo.completed || false
    )

    const toggleComplete = useCallback(async () => {
        const newCompletedState = !isCompleted
        onUpdate(todo.id as string, newCompletedState)
        setIsCompleted(newCompletedState)
    }, [])

    return (
        <Card className="bg-zinc-800 border-zinc-700">
            <CardContent className="flex items-center justify-between p-4">
                <span
                    className={`${isCompleted ? "line-through text-zinc-500" : "text-white"}`}
                >
                    {todo.title}
                </span>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleComplete}
                        className="bg-zinc-700 text-zinc-300 hover:bg-zinc-600 hover:text-white border-zinc-600"
                    >
                        {isCompleted ? (
                            <XCircle className="mr-2 h-4 w-4" />
                        ) : (
                            <CheckCircle className="mr-2 h-4 w-4" />
                        )}
                        {isCompleted ? "Undo" : "Complete"}
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onDelete(todo.id as string)}
                        className="bg-red-900 text-white hover:bg-red-800"
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </Button>
                    {isAdmin && (
                        <span className="ml-2 text-sm text-zinc-400">
                            User ID: {todo.userId}
                        </span>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

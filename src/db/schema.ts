import { relations } from "drizzle-orm"
import * as t from "drizzle-orm/pg-core"

export const users = t.pgTable("users", {
    id: t
        .uuid()
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    username: t.varchar("username", { length: 50 }).notNull(),
    email: t.varchar("email", { length: 100 }).notNull().unique(),
})

export const userRelation = relations(users, ({ many }) => ({
    todos: many(todos),
}))

export const todos = t.pgTable("todos", {
    id: t
        .uuid()
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    title: t.varchar("title", { length: 100 }).notNull(),
    content: t.varchar("content", { length: 1000 }).notNull(),
    userId: t.uuid().notNull(),
})

export const todoRelation = relations(todos, ({ one }) => ({
    user: one(users, {
        fields: [todos.userId],
        references: [users.id],
    }),
}))

import { relations } from "drizzle-orm"
import * as t from "drizzle-orm/pg-core"

export const users = t.pgTable("users", {
    id: t.varchar("id", { length: 255 }).notNull(),
    email: t.varchar("email", { length: 100 }).notNull().unique(),
    subscribtionEnds: t.date("date", { mode: "date" }),
    isSubscribed: t.boolean().default(false),
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
    content: t.varchar("content", { length: 1000 }).default(""),
    completed: t.boolean().default(false),
    userId: t.varchar("user_id", { length: 255 }).notNull(),
    createdAt: t.timestamp("created_at").defaultNow(),
    updatedAt: t.timestamp("updated_at").defaultNow(),
})

export const todoRelation = relations(todos, ({ one }) => ({
    user: one(users, {
        fields: [todos.userId],
        references: [users.id],
    }),
}))

export type InsertUser = typeof users.$inferInsert
export type SelectUser = typeof users.$inferSelect

export type InsertTodo = typeof todos.$inferInsert
export type SelectTodo = typeof todos.$inferSelect

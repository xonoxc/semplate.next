import { config } from "dotenv"
import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

config({ path: ".env" })

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined")
}

const dbClient = neon(process.env.DATABASE_URL)

export const db = drizzle(dbClient)

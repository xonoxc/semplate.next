ALTER TABLE "todos" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "todos" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "todos" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "subscribtionEnds" date;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "username";
CREATE TABLE IF NOT EXISTS "todos" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" varchar(100) NOT NULL,
	"content" varchar(1000) NOT NULL,
	"userId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"username" varchar(50) NOT NULL,
	"email" varchar(100) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);

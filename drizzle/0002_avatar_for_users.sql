ALTER TABLE "users" DROP CONSTRAINT "users_name_unique";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "avatar" varchar(100) DEFAULT 'https://github.com/shadcn.png' NOT NULL;
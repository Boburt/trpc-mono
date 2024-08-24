-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
DO $$ BEGIN
 CREATE TYPE "user_status" AS ENUM('inactive', 'blocked', 'active');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "organization_system_type" AS ENUM('jowi', 'r_keeper', 'iiko');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "work_schedule_entry_status" AS ENUM('closed', 'open');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "organization_payment_types" AS ENUM('client', 'card', 'cash');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "manufacturers_properties_types" AS ENUM('list', 'date', 'boolean', 'number', 'string');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "roles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(50) NOT NULL,
	"code" varchar(50),
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp(5) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(5) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by" uuid,
	"updated_by" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"phone" varchar(20),
	"email" varchar(100),
	"login" varchar(100) NOT NULL,
	"first_name" varchar(100),
	"last_name" varchar(100),
	"password" varchar NOT NULL,
	"salt" varchar,
	"is_super_user" boolean DEFAULT false NOT NULL,
	"status" "user_status" NOT NULL,
	"card_name" varchar(100),
	"card_number" varchar(100),
	"birth_date" timestamp(5) with time zone,
	"car_model" varchar(100),
	"car_number" varchar(100),
	"is_online" boolean DEFAULT false NOT NULL,
	"latitude" double precision DEFAULT 0,
	"longitude" double precision DEFAULT 0,
	"fcm_token" varchar(250),
	"wallet_balance" double precision DEFAULT 0 NOT NULL,
	"max_active_order_count" integer,
	"doc_files" text[],
	"order_start_date" timestamp(5) with time zone,
	"app_version" varchar(100),
	"created_at" timestamp(5) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(5) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"api_token" varchar(250),
	"tg_id" varchar(250)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"user_agent" text NOT NULL,
	"device_name" text NOT NULL,
	"created_at" timestamp(5) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(5) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "api_tokens" (
	"id" uuid,
	"active" boolean,
	"token" text,
	"created_at" timestamp(5) with time zone,
	"updated_at" timestamp(5) with time zone,
	"created_by" uuid,
	"updated_by" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "scheduled_reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"cron" text NOT NULL,
	"created_at" timestamp(5) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(5) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "scheduled_reports_subscription" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"report_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp(5) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(5) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "langs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL,
	"is_default" boolean DEFAULT false NOT NULL,
	"created_at" timestamp(5) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(5) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"code" text NOT NULL,
	"parent_id" uuid,
	"i18n_name" jsonb NOT NULL,
	"i18n_description" jsonb,
	"created_at" timestamp(5) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(5) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "image_sizes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"width" integer NOT NULL,
	"height" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "assets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"path" text,
	"size" integer NOT NULL,
	"mime_type" text NOT NULL,
	"parent_id" uuid,
	"resize_code" text,
	"model" text,
	"model_id" text,
	"created_at" timestamp(5) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(5) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by" uuid,
	"updated_by" uuid,
	"code" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "manufacturers_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"manufacturer_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	"created_at" timestamp(5) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(5) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"created_at" timestamp(5) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(5) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "manufacturers_properties_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"i18n_name" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "manufacturers_properties" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"i18n_name" jsonb,
	"category_id" uuid NOT NULL,
	"type" "manufacturers_properties_types" NOT NULL,
	"additional_data" jsonb,
	"created_at" timestamp(5) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(5) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"show_in_filter" boolean DEFAULT false NOT NULL,
	"show_in_list" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "manufacturers_properties_values" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_id" uuid NOT NULL,
	"manufacturer_id" uuid NOT NULL,
	"value" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "manufacturers_reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"manufacturer_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"rating" double precision,
	"comment" text,
	"active" boolean DEFAULT false NOT NULL,
	"created_at" timestamp(5) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(5) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "seo_links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"link" text NOT NULL,
	"description" text,
	"created_at" timestamp(5) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(5) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "permissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(160) NOT NULL,
	"description" varchar(60) NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp(5) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(5) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by" uuid,
	"updated_by" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "manufacturers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"short_name" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp(5) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(5) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"city_id" uuid,
	"rating" double precision DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "roles_permissions" (
	"role_id" uuid NOT NULL,
	"permission_id" uuid NOT NULL,
	"created_by" uuid,
	"updated_by" uuid,
	CONSTRAINT PK_0cd11f0b35c4d348c6ebb9b36b7 PRIMARY KEY("role_id","permission_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_permissions" (
	"user_id" uuid NOT NULL,
	"permission_id" uuid NOT NULL,
	"created_by" uuid,
	"updated_by" uuid,
	CONSTRAINT PK_7f3736984cd8546a1e418005561 PRIMARY KEY("user_id","permission_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_roles" (
	"user_id" uuid NOT NULL,
	"role_id" uuid NOT NULL,
	"created_by" uuid,
	"updated_by" uuid,
	CONSTRAINT PK_c525e9373d63035b9919e578a9c PRIMARY KEY("user_id","role_id")
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "UQ_648e3f5447f725579d7d4ffdfb7" ON "roles" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "UQ_0e2c0e1b4b0b0b0b0b0b0b0b0b0" ON "roles" ("code");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "UQ_a000cca60bcf04454e727699490" ON "users" ("phone");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "UQ_0e2c0e1b4b5b0b0b0b0b0b0b0b0" ON "users" ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "UQ_0e2c0e1b3b0b0b0b0b0b0b0b0b0" ON "users" ("login");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "fki_users_login" ON "users" ("login");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "langs_code_key" ON "langs" ("code");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "categories_code_key" ON "categories" ("code");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "image_sizes_code_key" ON "image_sizes" ("code");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "UQ_d090ad82a0e97ce764c06c7b312" ON "permissions" ("slug");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "roles" ADD CONSTRAINT "FK_4a39f3095781cdd9d6061afaae5" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "roles" ADD CONSTRAINT "FK_747b580d73db0ad78963d78b076" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scheduled_reports_subscription" ADD CONSTRAINT "FK_scheduled_reports_subscription_report_id" FOREIGN KEY ("report_id") REFERENCES "scheduled_reports"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scheduled_reports_subscription" ADD CONSTRAINT "FK_scheduled_reports_subscription_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "assets" ADD CONSTRAINT "FK_assets_created_by" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "assets" ADD CONSTRAINT "FK_assets_updated_by" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufacturers_categories" ADD CONSTRAINT "FK_manufacturers_categories_category_id" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufacturers_categories" ADD CONSTRAINT "FK_manufacturers_categories_manufacturer_id" FOREIGN KEY ("manufacturer_id") REFERENCES "manufacturers"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufacturers_properties" ADD CONSTRAINT "FK_manufacturers_properties_category_id" FOREIGN KEY ("category_id") REFERENCES "manufacturers_properties_categories"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufacturers_properties_values" ADD CONSTRAINT "FK_manufacturers_properties_values_manufacturer_id" FOREIGN KEY ("manufacturer_id") REFERENCES "manufacturers"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufacturers_properties_values" ADD CONSTRAINT "FK_manufacturers_properties_values_property_id" FOREIGN KEY ("property_id") REFERENCES "manufacturers_properties"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufacturers_reviews" ADD CONSTRAINT "FK_manufacturers_reviews_manufacturer_id" FOREIGN KEY ("manufacturer_id") REFERENCES "manufacturers"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufacturers_reviews" ADD CONSTRAINT "FK_manufacturers_reviews_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "permissions" ADD CONSTRAINT "FK_58fae278276b7c2c6dde2bc19a5" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "permissions" ADD CONSTRAINT "FK_c398f7100db3e0d9b6a6cd6beaf" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufacturers" ADD CONSTRAINT "FK_manufacturers_city_id" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "roles_permissions" ADD CONSTRAINT "FK_337aa8dba227a1fe6b73998307b" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "roles_permissions" ADD CONSTRAINT "FK_7d2dad9f14eddeb09c256fea719" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "roles_permissions" ADD CONSTRAINT "FK_a3f5b9874c55ee69fdd01531e14" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "roles_permissions" ADD CONSTRAINT "FK_d1ba552f47d08621fdd2bbb0124" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_permissions" ADD CONSTRAINT "FK_1139f007de51cfe686c4b2abb43" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_permissions" ADD CONSTRAINT "FK_4de7d0b175f702be3be55270023" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_permissions" ADD CONSTRAINT "FK_997b44464224900ee2727190813" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_permissions" ADD CONSTRAINT "FK_b09b9a210c60f41ec7b453758e9" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_roles" ADD CONSTRAINT "FK_1cf664021f00b9cc1ff95e17de4" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_roles" ADD CONSTRAINT "FK_471c7c874c2a37052f53d920803" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_roles" ADD CONSTRAINT "FK_88da3fa85d1220b0ac18b08ce47" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_roles" ADD CONSTRAINT "FK_e4435209df12bc1f001e5360174" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/
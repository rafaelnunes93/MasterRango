CREATE TABLE "recipes" (
  "id" SERIAL PRIMARY KEY,
  "category_id" int UNIQUE,
  "user_id" int UNIQUE,
  "title" text NOT NULL,
  "ingredients" text[],
  "preparation" text[],
  "description" text NOT NULL,
  "quantity" int DEFAULT 0,
  "status" int DEFAULT 1,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL
);

CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "path" text NOT NULL,
  "recipes_id" int UNIQUE
);

ALTER TABLE "recipes" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "files" ADD FOREIGN KEY ("recipes_id") REFERENCES "recipes" ("id");






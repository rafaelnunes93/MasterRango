
DROP DATABASE IF EXISTS masterrangodb;

CREATE DATABASE masterrangooficial

CREATE TABLE "recipes" (
  "id" SERIAL PRIMARY KEY,
  "category_id" int NOT NULL,
  "user_id" int,
  "title" text NOT NULL,
  "ingredients" text[],
  "preparation" text[],
  "description" text NOT NULL,
  "quantity" int ,
  "time" int,
  "status" int DEFAULT 0,
  "dificulty" text NOT NULL,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL
);


INSERT INTO categories(name) VALUES ('Acompanhamentos');
INSERT INTO categories(name) VALUES ('Bebidas');
INSERT INTO categories(name) VALUES ('Bolos');
INSERT INTO categories(name) VALUES ('Carne Bovina');
INSERT INTO categories(name) VALUES ('Carne Suina');
INSERT INTO categories(name) VALUES ('Frango');
INSERT INTO categories(name) VALUES ('Peixes');
INSERT INTO categories(name) VALUES ('Frutos do mar');
INSERT INTO categories(name) VALUES ('Massas');
INSERT INTO categories(name) VALUES ('Molhos');
INSERT INTO categories(name) VALUES ('Sopas');
INSERT INTO categories(name) VALUES ('Sobremesas');
INSERT INTO categories(name) VALUES ('Lanches');
INSERT INTO categories(name) VALUES ('Tortas');
INSERT INTO categories(name) VALUES ('Saudaveis/Fitness');
INSERT INTO categories(name) VALUES ('Saladas');

CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "path" text NOT NULL,
  "recipes_id" int 
);


ALTER TABLE "recipes" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");
ALTER TABLE "files" ADD FOREIGN KEY ("recipes_id") REFERENCES "recipes" ("id");


CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "email" text UNIQUE NOT NULL,
  "password" text NOT NULL,
  "levelUser_id" int DEFAULT 1 NOT NULL,
  "score" int DEFAULT 1 NOT NULL,
  "reset_token" text,
  "reset_token_expires" text,
  "is_admin" boolean DEFAULT false,
  "created_at" timestamp DEFAULT (now())
  "updated_at" timestamp DEFAULT(now())
);

CREATE TABLE "level" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL
);

INSERT INTO level(name) VALUES ('aprendiz');
INSERT INTO level(name) VALUES ('cozinheiro');
INSERT INTO level(name) VALUES ('chef');
INSERT INTO level(name) VALUES ('master chef');


--foreing key

ALTER TABLE "recipes" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "users" ADD FOREIGN KEY ("levelUser_id") REFERENCES "level" ("id");



-- tabela que controla a sessao do usuario
 
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" 
ADD CONSTRAINT "session_pkey" 
PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;


-- COLOCANDO AS CONSTRAINTS PARA O MODO CASCADE
ALTER TABLE "recipes"
DROP CONSTRAINT recipes_user_id_fkey,
ADD CONSTRAINT recipes_user_id_fkey
FOREIGN KEY (user_id)
REFERENCES "users" (id)
ON DELETE CASCADE;


ALTER TABLE "files"
DROP CONSTRAINT files_recipes_id_fkey,
ADD CONSTRAINT files_recipes_id_fkey
FOREIGN KEY (recipes_id)
REFERENCES "recipes" (id)
ON DELETE CASCADE;

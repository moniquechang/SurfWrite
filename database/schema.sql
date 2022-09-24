set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "entries" (
	"entryId" serial NOT NULL,
	"userId" int NOT NULL,
	"content" TEXT NOT NULL,
	"weather" json NOT NULL,
	"date" TEXT NOT NULL,
	"createdAt" timestamptz NOT NULL default now(),
	CONSTRAINT "entries_pk" PRIMARY KEY ("entryId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "photos" (
	"photoId" serial NOT NULL,
	"entryId" int NOT NULL,
	"photoUrl" TEXT NOT NULL,
	"uploadedAt" timestamptz NOT NULL default now(),
	CONSTRAINT "photos_pk" PRIMARY KEY ("photoId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "videos" (
	"videoId" serial NOT NULL,
	"entryId" int NOT NULL,
	"videoUrl" TEXT NOT NULL,
	"uploadedAt" timestamptz NOT NULL default now(),
	CONSTRAINT "videos_pk" PRIMARY KEY ("videoId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"name" TEXT NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	"location" TEXT NOT NULL,
	"joinedAt" timestamptz NOT NULL default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "entries" ADD CONSTRAINT "entries_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "photos" ADD CONSTRAINT "photos_fk0" FOREIGN KEY ("entryId") REFERENCES "entries"("entryId");

ALTER TABLE "videos" ADD CONSTRAINT "videos_fk0" FOREIGN KEY

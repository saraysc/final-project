set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.

drop schema "public" cascade;

create schema "public";

create table "public"."groups" (
  "groupId"        serial,
  "groupName"      text           not null,
  "image"            text           not null,
  "caption"        text           not null,
  "createdAt"      timestamptz(6) not null default now(),
  primary key ("groupId")
) WITH(
  OIDS=FALSE
);

create table "public"."posts" (
  "postId"        serial,
  "title"         text           not null,
  "image"         text           not null,
  "caption"       text           not null,
  "createdAt"     timestamptz(6) not null default now(),
  primary key ("postId")
) WITH(
  OIDS=FALSE
);


 CREATE TABLE "public.users" (
	"userId" serial NOT NULL,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"username" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"profilePicture" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.groups" (
	"groupId" serial NOT NULL,
	"groupInfo" TEXT NOT NULL,
	"groupPicture" TEXT NOT NULL,
	"userId" integer NOT NULL,
	"groupName" TEXT NOT NULL,
	CONSTRAINT "groups_pk" PRIMARY KEY ("groupId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.posts" (
	"postId" serial NOT NULL,
	"groupId" integer NOT NULL,
	"postMessage" TEXT NOT NULL,
	"userId" TEXT NOT NULL,
	"postPicture" TEXT NOT NULL,
	"createdAt" DATETIME NOT NULL,
	CONSTRAINT "posts_pk" PRIMARY KEY ("postId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.comments" (
	"commentId" serial NOT NULL,
	"comment" TEXT NOT NULL,
	"userId" integer NOT NULL,
	"postId" integer NOT NULL,
	"createdAt" DATETIME NOT NULL,
	CONSTRAINT "comments_pk" PRIMARY KEY ("commentId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.likes" (
	"likeId" serial NOT NULL,
	"dislike" BOOLEAN NOT NULL,
	"postId" integer NOT NULL,
	"userId" integer NOT NULL,
	"like" BOOLEAN NOT NULL,
	CONSTRAINT "likes_pk" PRIMARY KEY ("likeId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "groups" ADD CONSTRAINT "groups_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "posts" ADD CONSTRAINT "posts_fk0" FOREIGN KEY ("groupId") REFERENCES "groups"("groupId");
ALTER TABLE "posts" ADD CONSTRAINT "posts_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("postId") REFERENCES "posts"("postId");

ALTER TABLE "likes" ADD CONSTRAINT "likes_fk0" FOREIGN KEY ("postId") REFERENCES "posts"("postId");
ALTER TABLE "likes" ADD CONSTRAINT "likes_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");

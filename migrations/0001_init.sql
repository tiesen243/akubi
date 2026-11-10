-- Migration number: 0001 	 2026-11-10T03:54:25.341Z

CREATE TABLE "main"."posts" (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL
);

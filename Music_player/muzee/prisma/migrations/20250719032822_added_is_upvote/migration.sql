/*
  Warnings:

  - A unique constraint covering the columns `[userId,url]` on the table `Stream` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Stream_userId_url_key" ON "Stream"("userId", "url");

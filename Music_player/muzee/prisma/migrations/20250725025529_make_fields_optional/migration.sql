/*
  Warnings:

  - You are about to drop the column `BigThumbnail` on the `Stream` table. All the data in the column will be lost.
  - You are about to drop the column `SmallThumbnail` on the `Stream` table. All the data in the column will be lost.
  - The primary key for the `Upvote` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Upvote` table. All the data in the column will be lost.
  - Made the column `extractedId` on table `Stream` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Stream_userId_url_key";

-- DropIndex
DROP INDEX "Upvote_userId_streamId_key";

-- AlterTable
ALTER TABLE "Stream" DROP COLUMN "BigThumbnail",
DROP COLUMN "SmallThumbnail",
ADD COLUMN     "bigThumbnail" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "smallThumbnail" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ALTER COLUMN "title" DROP DEFAULT,
ALTER COLUMN "extractedId" SET NOT NULL;

-- AlterTable
-- Add this before ALTER TABLE
UPDATE "Stream" SET "bigThumbnail" = 'https://i.ytimg.com/vi/XRACQhszum4/maxresdefault.jpg' WHERE "bigThumbnail" IS NULL;
UPDATE "Stream" SET "smallThumbnail" = 'https://res.cloudinary.com/upwork-cloud/image/upload/c_scale,w_1000/v1686668700/catalog/1391737567550631936/vr1bbsdrjdj5gedvikkm.jpg' WHERE "smallThumbnail" IS NULL;

ALTER TABLE "Upvote" DROP CONSTRAINT "Upvote_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Upvote_pkey" PRIMARY KEY ("userId", "streamId");

-- CreateTable
CREATE TABLE "Downvote" (
    "userId" TEXT NOT NULL,
    "streamId" TEXT NOT NULL,

    CONSTRAINT "Downvote_pkey" PRIMARY KEY ("userId","streamId")
);

-- AddForeignKey
ALTER TABLE "Downvote" ADD CONSTRAINT "Downvote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Downvote" ADD CONSTRAINT "Downvote_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "Stream"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - Made the column `bigThumbnail` on table `Stream` required. This step will fail if there are existing NULL values in that column.
  - Made the column `smallThumbnail` on table `Stream` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
-- Add this before ALTER TABLE
UPDATE "Stream" SET "bigThumbnail" = 'https://i.ytimg.com/vi/XRACQhszum4/maxresdefault.jpg' WHERE "bigThumbnail" IS NULL;
UPDATE "Stream" SET "smallThumbnail" = 'https://res.cloudinary.com/upwork-cloud/image/upload/c_scale,w_1000/v1686668700/catalog/1391737567550631936/vr1bbsdrjdj5gedvikkm.jpg' WHERE "smallThumbnail" IS NULL;

ALTER TABLE "Stream" ALTER COLUMN "bigThumbnail" SET NOT NULL,
ALTER COLUMN "smallThumbnail" SET NOT NULL;

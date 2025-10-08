/*
  Warnings:

  - You are about to drop the column `images` on the `Carousel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[imageId]` on the table `Carousel` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Carousel_images_key";

-- AlterTable
ALTER TABLE "Carousel" DROP COLUMN "images",
ADD COLUMN     "imageId" TEXT;

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "href" TEXT NOT NULL,
    "alt" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_id_key" ON "Image"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Image_href_key" ON "Image"("href");

-- CreateIndex
CREATE UNIQUE INDEX "Carousel_imageId_key" ON "Carousel"("imageId");

-- AddForeignKey
ALTER TABLE "Carousel" ADD CONSTRAINT "Carousel_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

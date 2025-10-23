/*
  Warnings:

  - You are about to drop the column `imageId` on the `Carousel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[carouselId]` on the table `Image` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."Carousel" DROP CONSTRAINT "Carousel_imageId_fkey";

-- DropIndex
DROP INDEX "public"."Carousel_imageId_key";

-- AlterTable
ALTER TABLE "Carousel" DROP COLUMN "imageId";

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "carouselId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Image_carouselId_key" ON "Image"("carouselId");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_carouselId_fkey" FOREIGN KEY ("carouselId") REFERENCES "Carousel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `content` on the `Carousel` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Carousel` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Description` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[normalizedName]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[imageId]` on the table `Description` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `normalizedName` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Carousel" DROP CONSTRAINT "Carousel_imageId_fkey";

-- DropIndex
DROP INDEX "public"."Category_name_key";

-- AlterTable
ALTER TABLE "Carousel" DROP COLUMN "content",
DROP COLUMN "title";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "normalizedName" TEXT NOT NULL,
ADD COLUMN     "parentId" TEXT;

-- AlterTable
ALTER TABLE "Description" DROP COLUMN "image",
ADD COLUMN     "imageId" TEXT;

-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "productId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_normalizedName_key" ON "Category"("normalizedName");

-- CreateIndex
CREATE UNIQUE INDEX "Description_imageId_key" ON "Description"("imageId");

-- AddForeignKey
ALTER TABLE "Carousel" ADD CONSTRAINT "Carousel_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Description" ADD CONSTRAINT "Description_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

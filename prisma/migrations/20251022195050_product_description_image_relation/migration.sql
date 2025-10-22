/*
  Warnings:

  - You are about to drop the column `imageId` on the `Description` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[descriptionId]` on the table `Image` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."Category" DROP CONSTRAINT "Category_parentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Description" DROP CONSTRAINT "Description_imageId_fkey";

-- DropIndex
DROP INDEX "public"."Category_normalizedName_key";

-- DropIndex
DROP INDEX "public"."Description_imageId_key";

-- DropIndex
DROP INDEX "public"."Image_href_key";

-- AlterTable
ALTER TABLE "Description" DROP COLUMN "imageId";

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "descriptionId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Image_descriptionId_key" ON "Image"("descriptionId");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_descriptionId_fkey" FOREIGN KEY ("descriptionId") REFERENCES "Description"("id") ON DELETE CASCADE ON UPDATE CASCADE;

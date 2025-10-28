/*
  Warnings:

  - You are about to drop the column `thumbnail` on the `Blog` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[blogId]` on the table `Image` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "thumbnail";

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "blogId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Image_blogId_key" ON "Image"("blogId");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

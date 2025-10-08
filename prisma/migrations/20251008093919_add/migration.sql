/*
  Warnings:

  - Added the required column `productId` to the `Description` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Notion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Description" ADD COLUMN     "productId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Notion" ADD COLUMN     "productId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Notion" ADD CONSTRAINT "Notion_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Description" ADD CONSTRAINT "Description_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

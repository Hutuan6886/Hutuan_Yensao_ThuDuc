/*
  Warnings:

  - You are about to drop the column `images` on the `Product` table. All the data in the column will be lost.
  - Made the column `imageId` on table `Carousel` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `productId` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Carousel" DROP CONSTRAINT "Carousel_imageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "public"."OrderItem" DROP CONSTRAINT "OrderItem_productMassId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProductMass" DROP CONSTRAINT "ProductMass_massId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProductMass" DROP CONSTRAINT "ProductMass_productId_fkey";

-- AlterTable
ALTER TABLE "Carousel" ALTER COLUMN "imageId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "productId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "images";

-- AddForeignKey
ALTER TABLE "Carousel" ADD CONSTRAINT "Carousel_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductMass" ADD CONSTRAINT "ProductMass_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductMass" ADD CONSTRAINT "ProductMass_massId_fkey" FOREIGN KEY ("massId") REFERENCES "Mass"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productMassId_fkey" FOREIGN KEY ("productMassId") REFERENCES "ProductMass"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

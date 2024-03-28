/*
  Warnings:

  - You are about to drop the column `productsBought` on the `ProductsCustomer` table. All the data in the column will be lost.
  - You are about to drop the column `productsName` on the `ProductsShop` table. All the data in the column will be lost.
  - Added the required column `productName` to the `ProductsCustomer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productName` to the `ProductsShop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductsCustomer" DROP COLUMN "productsBought",
ADD COLUMN     "productName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductsShop" DROP COLUMN "productsName",
ADD COLUMN     "productName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductsShop" ADD CONSTRAINT "ProductsShop_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

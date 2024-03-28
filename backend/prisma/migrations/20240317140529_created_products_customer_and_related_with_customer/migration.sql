/*
  Warnings:

  - You are about to drop the column `bill` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `productsBought` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the `Products` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "bill",
DROP COLUMN "productsBought";

-- DropTable
DROP TABLE "Products";

-- CreateTable
CREATE TABLE "ProductsShop" (
    "id" SERIAL NOT NULL,
    "shopId" INTEGER NOT NULL,
    "productsName" TEXT NOT NULL,
    "productPrice" INTEGER NOT NULL,

    CONSTRAINT "ProductsShop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductsCustomer" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "productsBought" TEXT NOT NULL,
    "productPrice" INTEGER NOT NULL,

    CONSTRAINT "ProductsCustomer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductsCustomer_customerId_key" ON "ProductsCustomer"("customerId");

-- AddForeignKey
ALTER TABLE "ProductsCustomer" ADD CONSTRAINT "ProductsCustomer_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

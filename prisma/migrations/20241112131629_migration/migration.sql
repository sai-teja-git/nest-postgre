/*
  Warnings:

  - A unique constraint covering the columns `[name,brandId,vendorId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Product_name_brandId_vendorId_key" ON "Product"("name", "brandId", "vendorId");

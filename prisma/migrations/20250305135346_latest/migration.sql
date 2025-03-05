/*
  Warnings:

  - You are about to drop the column `Price` on the `OrderItem` table. All the data in the column will be lost.
  - Added the required column `price` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "Price",
ADD COLUMN     "price" DECIMAL(12,2) NOT NULL;

/*
  Warnings:

  - You are about to drop the column `categories` on the `properties` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "properties" DROP COLUMN "categories",
ADD COLUMN     "categoryName" TEXT[];

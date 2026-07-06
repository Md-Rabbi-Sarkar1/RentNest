/*
  Warnings:

  - You are about to drop the column `categoryId` on the `properties` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_authorId_fkey";

-- DropForeignKey
ALTER TABLE "properties" DROP CONSTRAINT "properties_categoryId_fkey";

-- AlterTable
ALTER TABLE "properties" DROP COLUMN "categoryId",
ADD COLUMN     "categories" TEXT[];

-- DropTable
DROP TABLE "categories";

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

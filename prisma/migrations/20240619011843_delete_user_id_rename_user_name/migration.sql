/*
  Warnings:

  - You are about to drop the column `userId` on the `BudgetByUser` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `BudgetByUser` table. All the data in the column will be lost.
  - Added the required column `userTag` to the `BudgetByUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BudgetByUser" DROP CONSTRAINT "BudgetByUser_userId_fkey";

-- AlterTable
ALTER TABLE "BudgetByUser" DROP COLUMN "userId",
DROP COLUMN "userName",
ADD COLUMN     "userTag" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "BudgetByUser" ADD CONSTRAINT "BudgetByUser_userTag_fkey" FOREIGN KEY ("userTag") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `usreId` on the `TwoFactorConfirmation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `TwoFactorConfirmation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `TwoFactorConfirmation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TwoFactorConfirmation" DROP CONSTRAINT "TwoFactorConfirmation_usreId_fkey";

-- DropIndex
DROP INDEX "TwoFactorConfirmation_usreId_key";

-- AlterTable
ALTER TABLE "TwoFactorConfirmation" DROP COLUMN "usreId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorConfirmation_userId_key" ON "TwoFactorConfirmation"("userId");

-- AddForeignKey
ALTER TABLE "TwoFactorConfirmation" ADD CONSTRAINT "TwoFactorConfirmation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `availableSpots` on the `TimeSlot` table. All the data in the column will be lost.
  - You are about to drop the column `maxCapacity` on the `Workshop` table. All the data in the column will be lost.
  - Added the required column `maxCapacity` to the `TimeSlot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TimeSlot" DROP COLUMN "availableSpots",
ADD COLUMN     "maxCapacity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Workshop" DROP COLUMN "maxCapacity";

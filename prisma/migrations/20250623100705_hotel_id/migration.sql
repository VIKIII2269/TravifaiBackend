/*
  Warnings:

  - A unique constraint covering the columns `[hotelId]` on the table `PropertyInfo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hotelId` to the `PropertyInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PropertyInfo" ADD COLUMN     "hotelId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PropertyInfo_hotelId_key" ON "PropertyInfo"("hotelId");

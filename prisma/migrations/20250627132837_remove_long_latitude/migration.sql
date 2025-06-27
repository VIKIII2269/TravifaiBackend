/*
  Warnings:

  - You are about to drop the column `locationLatitude` on the `PropertyInfo` table. All the data in the column will be lost.
  - You are about to drop the column `locationLongitude` on the `PropertyInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PropertyInfo" DROP COLUMN "locationLatitude",
DROP COLUMN "locationLongitude";

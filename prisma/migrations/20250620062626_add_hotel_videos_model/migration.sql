/*
  Warnings:

  - You are about to drop the column `uploadIntroVideoUrl` on the `PropertyInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PropertyInfo" DROP COLUMN "uploadIntroVideoUrl";

-- CreateTable
CREATE TABLE "HotelVideo" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HotelVideo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HotelVideo" ADD CONSTRAINT "HotelVideo_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "PropertyInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "PropertyInfo"("hotelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetByUser" ADD CONSTRAINT "BudgetByUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

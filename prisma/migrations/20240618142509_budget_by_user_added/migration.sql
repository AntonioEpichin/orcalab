-- CreateTable
CREATE TABLE "BudgetByUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BudgetByUser_pkey" PRIMARY KEY ("id")
);

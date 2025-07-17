-- AlterTable
ALTER TABLE "Profile" ADD COLUMN "resetToken" TEXT;
ALTER TABLE "Profile" ADD COLUMN "resetTokenExpiry" DATETIME;

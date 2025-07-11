-- AlterTable
ALTER TABLE "Profile" ADD COLUMN "lastUsernameChange" DATETIME;
ALTER TABLE "Profile" ADD COLUMN "usernameChangeCooldown" INTEGER;

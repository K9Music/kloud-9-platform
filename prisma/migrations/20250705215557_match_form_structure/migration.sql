/*
  Warnings:

  - Added the required column `password` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Made the column `bio` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `photoUrl` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `showcase` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "artType" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "bannerUrl" TEXT,
    "stageName" TEXT,
    "genre" TEXT,
    "style" TEXT,
    "producerTag" TEXT,
    "engineerTag" TEXT,
    "directedBy" TEXT,
    "designerStyle" TEXT,
    "skitmakerName" TEXT,
    "vixenName" TEXT,
    "showcase" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Profile" ("artType", "bannerUrl", "bio", "createdAt", "email", "genre", "id", "name", "photoUrl", "showcase", "stageName", "style", "username") SELECT "artType", "bannerUrl", "bio", "createdAt", "email", "genre", "id", "name", "photoUrl", "showcase", "stageName", "style", "username" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");
CREATE UNIQUE INDEX "Profile_username_key" ON "Profile"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

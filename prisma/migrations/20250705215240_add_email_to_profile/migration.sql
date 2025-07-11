/*
  Warnings:

  - Added the required column `email` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "stageName" TEXT,
    "genre" TEXT,
    "style" TEXT,
    "bio" TEXT,
    "photoUrl" TEXT,
    "bannerUrl" TEXT,
    "artType" TEXT NOT NULL,
    "showcase" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Profile" ("artType", "bannerUrl", "bio", "createdAt", "genre", "id", "name", "photoUrl", "showcase", "stageName", "style", "username") SELECT "artType", "bannerUrl", "bio", "createdAt", "genre", "id", "name", "photoUrl", "showcase", "stageName", "style", "username" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");
CREATE UNIQUE INDEX "Profile_username_key" ON "Profile"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

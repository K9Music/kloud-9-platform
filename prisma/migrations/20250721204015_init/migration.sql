-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
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
    "lastUsernameChange" TIMESTAMP(3),
    "usernameChangeCooldown" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resetToken" TEXT,
    "resetTokenExpiry" TIMESTAMP(3),

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_username_key" ON "Profile"("username");

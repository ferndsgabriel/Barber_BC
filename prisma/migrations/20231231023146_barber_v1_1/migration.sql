-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "sub" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adm" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "pass" TEXT NOT NULL,

    CONSTRAINT "Adm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL,
    "date" INTEGER NOT NULL,
    "HourStart" INTEGER NOT NULL,
    "HourFinish" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "hairStyle_id" TEXT NOT NULL,
    "additional_id" TEXT,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HairStyle" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "timer" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "HairStyle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Additional" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "timer" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Additional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "adm_id" TEXT,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_sub_key" ON "User"("sub");

-- CreateIndex
CREATE UNIQUE INDEX "Adm_email_key" ON "Adm"("email");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_hairStyle_id_fkey" FOREIGN KEY ("hairStyle_id") REFERENCES "HairStyle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_additional_id_fkey" FOREIGN KEY ("additional_id") REFERENCES "Additional"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_adm_id_fkey" FOREIGN KEY ("adm_id") REFERENCES "Adm"("id") ON DELETE SET NULL ON UPDATE CASCADE;

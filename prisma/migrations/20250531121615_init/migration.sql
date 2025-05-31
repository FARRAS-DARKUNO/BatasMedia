-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "noWA" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT,
    "role" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Berita" (
    "id" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "shortDesc" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "updateDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "typePriority" TEXT NOT NULL,
    "hastag" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    "idCategory" TEXT NOT NULL,

    CONSTRAINT "Berita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visitor" (
    "id" TEXT NOT NULL,
    "ipVisitors" TEXT NOT NULL,
    "idBerita" TEXT NOT NULL,

    CONSTRAINT "Visitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Berita" ADD CONSTRAINT "Berita_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Berita" ADD CONSTRAINT "Berita_idCategory_fkey" FOREIGN KEY ("idCategory") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visitor" ADD CONSTRAINT "Visitor_idBerita_fkey" FOREIGN KEY ("idBerita") REFERENCES "Berita"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

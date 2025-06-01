import { prisma } from "@/lib/prisma"; // pastikan sudah setup
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const idCategory = searchParams.get("idCategory");

  const whereClause = {
    ...(idCategory ? { idCategory } : {})
  };

  // Ambil 1 berita priority 1 terbaru
  const priority1 = await prisma.berita.findFirst({
    where: {
      typePriority: "1",
      ...whereClause,
    },
    orderBy: {
      updateDate: "desc",
    },
    include: {
      user: true,
      category: true,
    },
  });

  // Ambil 6 berita priority 2 terbaru
  const priority2 = await prisma.berita.findMany({
    where: {
      typePriority: "2",
      ...whereClause,
    },
    orderBy: {
      updateDate: "desc",
    },
    take: 6,
    include: {
      user: true,
      category: true,
    },
  });

  return NextResponse.json({
    priority1,
    priority2,
  });
}

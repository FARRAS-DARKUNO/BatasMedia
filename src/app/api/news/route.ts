import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/api-auth';
import { ADMIN, SUPERADMIN } from '@/data/type';

export const GET = withAuth(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '15');
  const skip = (page - 1) * limit;

  const status = searchParams.get('status'); // contoh: "Approved"
  const titleQuery = searchParams.get('title'); // contoh: "Pemilu"

  const whereClause: any = {};

  if (status) {
    whereClause.status = status;
  }

  if (titleQuery) {
    whereClause.title = {
      contains: titleQuery,
      mode: 'insensitive', // agar pencarian tidak case-sensitive
    };
  }

  const [berita, total] = await Promise.all([
    prisma.berita.findMany({
      skip,
      take: limit,
      where: whereClause,
      include: {
        user: { select: { id: true, username: true } },
        category: { select: { id: true, categoryName: true } },
      },
      orderBy: { updateDate: 'desc' },
    }),
    prisma.berita.count({ where: whereClause }),
  ]);

  return NextResponse.json({
    data: berita,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}, [SUPERADMIN, ADMIN]);


// POST - Create berita
export const POST = withAuth(async (req: NextRequest) => {
  const body = await req.json();
  const {
    thumbnail,
    shortDesc,
    content,
    status,
    typePriority,
    hastag,
    idUser,
    feedback,
    idCategory,
    title,
  } = body;

  const berita = await prisma.berita.create({
    data: {
      thumbnail,
      shortDesc,
      content,
      status,
      typePriority,
      hastag,
      idUser,
      feedback,
      idCategory,
      title
    },
  });

  return NextResponse.json({ message: 'News Successfully created', berita });
}, [SUPERADMIN, ADMIN]);

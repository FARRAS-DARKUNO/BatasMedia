import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/api-auth';
import { ADMIN, SUPERADMIN } from '@/data/type';

// GET - List berita
export const GET = withAuth(async () => {
  const berita = await prisma.berita.findMany({
    include: {
      user: { select: { id: true, username: true } },
      category: { select: { id: true, categoryName: true } },
    },
    orderBy: { updateDate: 'desc' },
  });
  return NextResponse.json(berita);
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
    idCategory,
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
      idCategory,
    },
  });

  return NextResponse.json({ message: 'News Successfully created', berita });
}, [SUPERADMIN, ADMIN]);

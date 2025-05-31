import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/api-auth';
import { SUPERADMIN } from '@/data/type';

// GET - Detail berita
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
    const berita = await prisma.berita.findUnique({
      where: { id: params.id },
      include: {
        user: { select: { id: true, username: true } },
        category: { select: { id: true, categoryName: true } },
      },
    });
  
    if (!berita) {
      return NextResponse.json({ error: 'Berita not found' }, { status: 404 });
    }
  
    return NextResponse.json(berita);
  }

// PUT - Update berita
export const PUT = withAuth(async (req: NextRequest, { params }: { params: { id: string } }) => {
  const {
    thumbnail,
    shortDesc,
    content,
    status,
    typePriority,
    hastag,
    idUser,
    idCategory,
  } = await req.json();

  const berita = await prisma.berita.update({
    where: { id: params.id },
    data: {
      thumbnail,
      shortDesc,
      content,
      status,
      typePriority,
      hastag,
      idUser,
      idCategory,
      updateDate: new Date(),
    },
  });

  return NextResponse.json({ message: 'Berita updated', berita });
}, ['SUPERADMIN', 'ADMIN']);

// DELETE - Delete berita
export const DELETE = withAuth(async (_req: NextRequest, { params }: { params: { id: string } }) => {
  await prisma.berita.delete({ where: { id: params.id } });
  return NextResponse.json({ message: 'Berita deleted' });
}, [SUPERADMIN]);

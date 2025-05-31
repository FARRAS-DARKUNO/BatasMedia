import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/api-auth';
import { ADMIN, SUPERADMIN } from '@/data/type';

// ✅ GET visitor by ID – ADMIN & SUPERADMIN
export const GET = withAuth(async (_req: NextRequest, { params }: { params: { id: string } }) => {
  const visitor = await prisma.visitor.findUnique({
    where: { id: params.id },
    include: {
      berita: {
        select: { id: true, shortDesc: true },
      },
    },
  });

  if (!visitor) {
    return NextResponse.json({ message: 'Visitor not found' }, { status: 404 });
  }

  return NextResponse.json(visitor);
}, [SUPERADMIN, ADMIN]);

// ✅ PUT (update visitor)
export const PUT = withAuth(async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { ipVisitors, idBerita } = await req.json();

  const updated = await prisma.visitor.update({
    where: { id: params.id },
    data: { ipVisitors, idBerita },
  });

  return NextResponse.json(updated);
}, [SUPERADMIN]);

// ✅ DELETE visitor
export const DELETE = withAuth(async (_req: NextRequest, { params }: { params: { id: string } }) => {
  await prisma.visitor.delete({ where: { id: params.id } });
  return NextResponse.json({ message: 'Visitor deleted' });
}, [SUPERADMIN]);

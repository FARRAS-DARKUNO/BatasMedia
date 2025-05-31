import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/api-auth';
import { ADMIN, SUPERADMIN } from '@/data/type';

// ✅ GET all visitors – hanya untuk ADMIN & SUPERADMIN
export const GET = withAuth(async () => {
  const visitors = await prisma.visitor.findMany({
    include: {
      berita: {
        select: { id: true, shortDesc: true },
      },
    },
    orderBy: { id: 'desc' },
  });
  return NextResponse.json(visitors);
}, [SUPERADMIN, ADMIN]);

// ✅ POST new visitor – tanpa token (public)
export async function POST(req: NextRequest) {
  const { ipVisitors, idBerita } = await req.json();

  if (!ipVisitors || !idBerita) {
    return NextResponse.json({ error: 'ipVisitors and idBerita are required' }, { status: 400 });
  }

  const visitor = await prisma.visitor.create({
    data: { ipVisitors, idBerita },
  });

  return NextResponse.json(visitor);
}

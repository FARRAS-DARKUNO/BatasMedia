import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/api-auth';
import { ADMIN, SUPERADMIN } from '@/data/type';

// GET All Categories (ADMIN & SUPERADMIN)
export const GET = withAuth(async () => {
  const categories = await prisma.category.findMany({
    orderBy: { categoryName: 'asc' }
  });
  return NextResponse.json(categories);
}, [SUPERADMIN,ADMIN]);

// CREATE New Category (SUPERADMIN only)
export const POST = withAuth(async (req: NextRequest) => {
  const { categoryName } = await req.json();

  const existing = await prisma.category.findFirst({
    where: { categoryName: { equals: categoryName, mode: 'insensitive' } }
  });

  if (existing) {
    return NextResponse.json({ message: 'Category already exists' }, { status: 400 });
  }

  const category = await prisma.category.create({
    data: { categoryName }
  });

  return NextResponse.json({ message: 'Category created', category });
}, [SUPERADMIN]);

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/api-auth';
import { ADMIN, SUPERADMIN } from '@/data/type';

// GET category by id (ADMIN & SUPERADMIN)
export const GET = withAuth(async (_req: NextRequest, { params }: { params: { id: string } }) => {
  const category = await prisma.category.findUnique({
    where: { id: params.id }
  });

  if (!category) {
    return NextResponse.json({ message: 'Category not found' }, { status: 404 });
  }

  return NextResponse.json(category);
}, [ADMIN, SUPERADMIN]);

// UPDATE category by id (SUPERADMIN only)
export const PUT = withAuth(async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { categoryName } = await req.json();

  const updated = await prisma.category.update({
    where: { id: params.id },
    data: { categoryName }
  });

  return NextResponse.json({ message: 'Category updated', category: updated });
}, [SUPERADMIN]);

// DELETE category by id (SUPERADMIN only)
export const DELETE = withAuth(async (_req: NextRequest, { params }: { params: { id: string } }) => {
  await prisma.category.delete({
    where: { id: params.id }
  });

  return NextResponse.json({ message: 'Category deleted' });
}, [SUPERADMIN]);

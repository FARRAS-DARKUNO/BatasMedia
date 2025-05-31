import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';
import { withAuth } from '@/lib/api-auth';
import { SUPERADMIN } from '@/data/type';

type Params = { params: { id: string } };

export const GET = withAuth(async (req: NextRequest, { params }: Params) => {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      username: true,
      fullName: true,
      noWA: true,
      role: true,
      image: true,
      startDate: true,
    },
  });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(user);
}, [SUPERADMIN]);

export const PUT = withAuth(async (req: NextRequest, { params }: Params) => {
  const { username, fullName, noWA, password,role, image } = await req.json();

  let data: any = { username, fullName, noWA, password,role, image };

  if (password) {
    data.password = await hashPassword(password);
  }

  const user = await prisma.user.update({
    where: { id: params.id },
    data,
  });

  return NextResponse.json({ message: 'User updated', user });
}, [SUPERADMIN]);

export const DELETE = withAuth(async (req: NextRequest, { params }: Params) => {
  await prisma.user.delete({ where: { id: params.id } });
  return NextResponse.json({ message: 'User deleted' });
}, [SUPERADMIN]);

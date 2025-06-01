import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';
import { withAuth } from '@/lib/api-auth';
import { SUPERADMIN } from '@/data/type';

export const GET = withAuth(async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      fullName: true,
      noWA: true,
      role: true,
      image: true,
      startDate: true,
    },
    orderBy: { startDate: 'desc' }
  });
  return NextResponse.json(users);
}, [SUPERADMIN]); // hanya superadmin bisa akses

export const POST = withAuth(async (req: NextRequest) => {
  const { username, fullName, noWA, password,role, image } = await req.json();

  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  }

  const hashed = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      username,
      fullName,
      noWA,
      password: hashed,
      role,
      image,
      startDate: new Date()
    }
  });

  return NextResponse.json({ message: 'User registered', user });
}, [SUPERADMIN]); // hanya superadmin bisa create user

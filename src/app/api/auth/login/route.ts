import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { comparePassword, signToken } from '@/lib/auth';
import { SUCCSESS } from '@/data/type';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user || !(await comparePassword(password, user.password))) {
    return NextResponse.json({ message: 'Check kembali username dan password anda' }, { status: 401 });
  }

  const token = signToken({ userId: user.id, role: user.role, username: user.username });

  return NextResponse.json({ message: SUCCSESS ,token, user: { username: user.username, role: user.role } });
}

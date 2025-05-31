import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './auth';

export function withAuth(handler: Function, roles?: string[]) {
  return async (req: NextRequest, context: any) => {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    // cek role jika diperlukan
    if (roles && !roles.includes(decoded.role)) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    // tambahkan user ke context
    req.user = decoded;

    return handler(req, context);
  };
}

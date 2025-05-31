import type { JwtPayload as BaseJwtPayload } from '@/lib/auth'; // pastikan path-nya sesuai
import { NextRequest } from 'next/server';

declare module 'next/server' {
  interface NextRequest {
    user?: BaseJwtPayload;
  }
}
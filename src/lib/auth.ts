import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const SECRET_KEY = process.env.JWT_SECRET || 'secret';

export function signToken(payload: any) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });
}

export type JwtPayload = {
  userId: string;
  role: string;
  username: string;
};

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, SECRET_KEY) as JwtPayload;
  } catch {
    return null;
  }
}

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

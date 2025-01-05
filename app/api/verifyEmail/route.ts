import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt, { JwtPayload } from 'jsonwebtoken';

const prisma = new PrismaClient();

interface DecodedToken extends JwtPayload {
  user_id: number;
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');

    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 400 });
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return NextResponse.json({ error: 'JWT secret is not configured' }, { status: 500 });
    }

    const decoded = jwt.verify(token, jwtSecret) as DecodedToken;  // Type assertion

    if (!decoded || !decoded.user_id) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }

    const userId = decoded.user_id;

    await prisma.users.update({
      where: { user_id: userId },
      data: { is_verified: true },
    });

    return NextResponse.json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Token verification failed:', error);
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
  }
}

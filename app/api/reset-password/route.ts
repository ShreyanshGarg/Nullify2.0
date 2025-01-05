import { PrismaClient } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

interface DecodedToken extends JwtPayload {
  user_id: number;
}

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');
    const { new_password } = await req.json();

    if (!token || !new_password) {
      return NextResponse.json({
        error: "Token and new password are required",
      });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return NextResponse.json(
        { error: "JWT secret is not configured" },
        { status: 500 }
      );
    }
    const decoded = jwt.verify(token, jwtSecret) as DecodedToken;

    if (!decoded || !decoded.user_id) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);

    await prisma.users.update({
      where: { user_id: decoded.user_id },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ message: "Password reset successfully" });
  } catch (error) {
    console.log("Error resetting password:", error);
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to reset password" },
      { status: 500 }
    );
  }
}

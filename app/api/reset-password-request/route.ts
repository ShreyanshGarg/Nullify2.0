import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { sendMail } from "@/app/lib/sendMail";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    // Validate input
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return NextResponse.json(
        { error: "JWT secret is not configured" },
        { status: 500 }
      );
    }

    const token = jwt.sign({ user_id: user.user_id }, jwtSecret, {
      expiresIn: "1h",
    });
    const resetUrl = `http://localhost:3000/api/reset-password?token=${token}`;

    await sendMail(
      email,
      "Password Reset Request",
      `<p>You requested to reset your password. Click the link below to reset it:</p>
      <p><a href="${resetUrl}">Reset Password</a></p>
      <p>If you did not request this, please ignore this email.</p>`
    );

    return NextResponse.json({
      message: "Password reset email sent successfully!",
    });
  } catch (error) {
    console.error("Error sending reset password request:", error);

    return NextResponse.json(
      { error: "Failed to send reset password email" },
      { status: 500 }
    );
  }
}

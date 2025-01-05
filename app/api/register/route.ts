import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { sendMail } from "@/app/lib/sendMail";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone_number, password } = body;

    if (!name || !email || !phone_number || !password) {
      return NextResponse.json(
        { error: "Name, email, phone number, and password are required" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.users.create({
      data: { name, email, phone_number, password: hashedPassword },
    });

    const userIdName = `${newUser.user_id}_${name.replace(/\s+/g, "_")}`;

    await prisma.users.update({
      where: { user_id: newUser.user_id },
      data: { uuid: userIdName },
    });

    const token = jwt.sign({ user_id: newUser.user_id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    const verificationUrl = `http://localhost:3000/api/verifyEmail?token=${token}`;
    // const verificationUrl = `http://localhost:3000/verifyEmail`;

    await sendMail(
      email,
      'Email Verification',
      `<p>Please click the following link to verify your email: <a href="${verificationUrl}">Verify Email</a></p>`
    );

    return NextResponse.json(
      { message: "User created successfully. Please check your email for verification." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json(
        { error: "Email or phone number already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

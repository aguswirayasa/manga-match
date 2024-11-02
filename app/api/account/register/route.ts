import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}
export async function POST(req: NextRequest) {
  const { username, email, password }: RegisterRequest = await req.json();

  if (!username || !email || !password) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Username or email already in use" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    return NextResponse.json({
      message: "User created successfully",
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description } = body;

    // Validate required fields
    if (!name || !name.trim()) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      );
    }

    // Check if member with same name already exists
    const existingMember = await prisma.member.findUnique({
      where: { name: name.trim() },
    });

    if (existingMember) {
      return NextResponse.json(
        { message: "A member with this name already exists" },
        { status: 409 }
      );
    }

    const newMember = await prisma.member.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        active: true,
      },
      include: {
        office: true
      }
    });

    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    console.error("Error creating member:", error);
    return NextResponse.json(
      { message: "Failed to create member" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const members = await prisma.member.findMany({
      where: {
        active: true
      },
      include: {
        office: true,
        dojHmo: true
      },
      orderBy: {
        createdAt: 'asc'
      }
    });
    return NextResponse.json(members);
  } catch (error) {
    console.error("Error fetching members:", error);
    return NextResponse.json(
      { message: "Failed to fetch members" },
      { status: 500 }
    );
  }
}

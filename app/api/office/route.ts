import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, code, description, head, location } = body;

    // Validate required fields
    if (!name || !name.trim()) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      );
    }

    if (!code || !code.trim()) {
      return NextResponse.json(
        { message: "Code is required" },
        { status: 400 }
      );
    }

    // Check if office with same name or code already exists
    const existingOffice = await prisma.office.findFirst({
      where: {
        OR: [
          { name: name.trim() },
          { code: code.trim() }
        ]
      },
    });

    if (existingOffice) {
      return NextResponse.json(
        { message: "An office with this name or code already exists" },
        { status: 409 }
      );
    }

    const newOffice = await prisma.office.create({
      data: {
        name: name.trim(),
        code: code.trim(),
        description: description?.trim() || null,
        head: head?.trim() || null,
        location: location?.trim() || null,
        active: true,
      },
    });

    return NextResponse.json(newOffice, { status: 201 });
  } catch (error) {
    console.error("Error creating office:", error);
    return NextResponse.json(
      { message: "Failed to create office" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const offices = await prisma.office.findMany({
      where: {
        active: true
      },
      orderBy: {
        name: 'asc'
      }
    });
    return NextResponse.json(offices);
  } catch (error) {
    console.error("Error fetching offices:", error);
    return NextResponse.json(
      { message: "Failed to fetch offices" },
      { status: 500 }
    );
  }
} 
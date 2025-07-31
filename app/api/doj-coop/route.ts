import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, code, description, type, status } = body;

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

    // Check if DOJ HMO with same name or code already exists
    const existingDOJHMO = await prisma.dOJHMO.findFirst({
      where: {
        OR: [
          { name: name.trim() },
          { code: code.trim() }
        ]
      },
    });

    if (existingDOJHMO) {
      return NextResponse.json(
        { message: "A DOJ HMO with this name or code already exists" },
        { status: 409 }
      );
    }

    const newDOJHMO = await prisma.dOJHMO.create({
      data: {
        name: name.trim(),
        code: code.trim(),
        description: description?.trim() || null,
        type: type?.trim() || null,
        status: status?.trim() || null,
        active: true,
      },
    });

    return NextResponse.json(newDOJHMO, { status: 201 });
  } catch (error) {
    console.error("Error creating DOJ HMO:", error);
    return NextResponse.json(
      { message: "Failed to create DOJ HMO" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const dojHmos = await prisma.dOJHMO.findMany({
      where: {
        active: true
      },
      orderBy: {
        name: 'asc'
      }
    });
    return NextResponse.json(dojHmos);
  } catch (error) {
    console.error("Error fetching DOJ HMOs:", error);
    return NextResponse.json(
      { message: "Failed to fetch DOJ HMOs" },
      { status: 500 }
    );
  }
} 
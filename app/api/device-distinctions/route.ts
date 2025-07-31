import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch all active device distinctions
export async function GET() {
  try {
    const deviceDistinctions = await prisma.deviceDistinction.findMany({
      where: {
        active: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(deviceDistinctions);
  } catch (error) {
    console.error("Error fetching device distinctions:", error);
    return NextResponse.json(
      { error: "Failed to fetch device distinctions" },
      { status: 500 }
    );
  }
}

// POST - Create a new device distinction
export async function POST(request: NextRequest) {
  try {
    const { name, description } = await request.json();
    console.log("Received description length:", description?.length);

    if (!name || name.trim() === "") {
      return NextResponse.json(
        { error: "Device distinction name is required" },
        { status: 400 }
      );
    }

    const deviceDistinction = await prisma.deviceDistinction.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
      },
    });

    console.log("Created device distinction description length:", deviceDistinction.description?.length);
    return NextResponse.json(deviceDistinction, { status: 201 });
  } catch (error: any) {
    console.error("Error creating device distinction:", error);
    
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Device distinction name already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create device distinction" },
      { status: 500 }
    );
  }
} 
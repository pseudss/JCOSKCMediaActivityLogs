import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch all active materials
export async function GET() {
  try {
    const materials = await prisma.material.findMany({
      where: {
        active: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(materials);
  } catch (error) {
    console.error("Error fetching materials:", error);
    return NextResponse.json(
      { error: "Failed to fetch materials" },
      { status: 500 }
    );
  }
}

// POST - Create a new material
export async function POST(request: NextRequest) {
  try {
    const { name, description, quantity, unit } = await request.json();

    if (!name || name.trim() === "") {
      return NextResponse.json(
        { error: "Material name is required" },
        { status: 400 }
      );
    }

    if (quantity === undefined || quantity < 0) {
      return NextResponse.json(
        { error: "Quantity must be a non-negative number" },
        { status: 400 }
      );
    }

    const material = await prisma.material.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        quantity: parseInt(quantity) || 0,
        unit: unit?.trim() || null,
      },
    });

    return NextResponse.json(material, { status: 201 });
  } catch (error: any) {
    console.error("Error creating material:", error);
    
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Material name already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create material" },
      { status: 500 }
    );
  }
} 
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PUT - Update a material
export async function PUT(
  request: NextRequest,
  context: any
) {
  const id = context.params?.id;

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

    const material = await prisma.material.update({
      where: { id },
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        quantity: parseInt(quantity) || 0,
        unit: unit?.trim() || null,
      },
    });

    return NextResponse.json(material);
  } catch (error: any) {
    console.error("Error updating material:", error);

    if (error.code === "P2025") {
      return NextResponse.json({ error: "Material not found" }, { status: 404 });
    }

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Material name already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update material" },
      { status: 500 }
    );
  }
}

// DELETE - Soft delete a material (set active to false)
export async function DELETE(
  request: NextRequest,
  context: any
) {
  const id = context.params?.id;

  try {
    const material = await prisma.material.update({
      where: { id },
      data: { active: false },
    });

    return NextResponse.json(material);
  } catch (error: any) {
    console.error("Error deleting material:", error);

    if (error.code === "P2025") {
      return NextResponse.json({ error: "Material not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to delete material" },
      { status: 500 }
    );
  }
}

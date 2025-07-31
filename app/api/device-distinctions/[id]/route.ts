import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PUT - Update a device distinction
export async function PUT(
  request: NextRequest,
  context: any
) {
  const id = context?.params?.id;

  try {
    const { name, description } = await request.json();

    if (!name || name.trim() === "") {
      return NextResponse.json(
        { error: "Device distinction name is required" },
        { status: 400 }
      );
    }

    const deviceDistinction = await prisma.deviceDistinction.update({
      where: { id },
      data: {
        name: name.trim(),
        description: description?.trim() || null,
      },
    });

    return NextResponse.json(deviceDistinction);
  } catch (error: any) {
    console.error("Error updating device distinction:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Device distinction not found" },
        { status: 404 }
      );
    }

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Device distinction name already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update device distinction" },
      { status: 500 }
    );
  }
}

// DELETE - Soft delete a device distinction (set active to false)
export async function DELETE(
  request: NextRequest,
  context: any
) {
  const id = context?.params?.id;

  try {
    const deviceDistinction = await prisma.deviceDistinction.update({
      where: { id },
      data: { active: false },
    });

    return NextResponse.json(deviceDistinction);
  } catch (error: any) {
    console.error("Error deleting device distinction:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Device distinction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Failed to delete device distinction" },
      { status: 500 }
    );
  }
}

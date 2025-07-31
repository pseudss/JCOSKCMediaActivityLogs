import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PUT - Update a device
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { name, description } = await request.json();
    const { id } = params;

    if (!name || name.trim() === "") {
      return NextResponse.json(
        { error: "Device name is required" },
        { status: 400 }
      );
    }

    const device = await prisma.device.update({
      where: { id },
      data: {
        name: name.trim(),
        description: description?.trim() || null,
      },
    });

    return NextResponse.json(device);
  } catch (error: any) {
    console.error("Error updating device:", error);
    
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Device not found" },
        { status: 404 }
      );
    }
    
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Device name already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update device" },
      { status: 500 }
    );
  }
}

// DELETE - Soft delete a device (set active to false)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const device = await prisma.device.update({
      where: { id },
      data: { active: false },
    });

    return NextResponse.json(device);
  } catch (error: any) {
    console.error("Error deleting device:", error);
    
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Device not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Failed to delete device" },
      { status: 500 }
    );
  }
} 
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PUT request to update device distinction
export async function PUT(req: NextRequest, context: { params: any }) {
  const id = context.params.id;

  try {
    const { name, description } = await req.json();

    if (!name || name.trim() === "") {
      return NextResponse.json(
        { error: "Device distinction name is required" },
        { status: 400 }
      );
    }

    const updated = await prisma.deviceDistinction.update({
      where: { id },
      data: {
        name: name.trim(),
        description: description?.trim() || null,
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE request to soft delete
export async function DELETE(req: NextRequest, context: { params: any }) {
  const id = context.params.id;

  try {
    const deleted = await prisma.deviceDistinction.update({
      where: { id },
      data: { active: false },
    });

    return NextResponse.json(deleted);
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

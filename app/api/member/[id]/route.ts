import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch a member by ID
export async function GET(
  request: NextRequest,
  context: any
) {
  const { id } = context.params;

  try {
    const member = await prisma.member.findUnique({
      where: { id },
      include: {
        office: true,
      },
    });

    if (!member) {
      return NextResponse.json(
        { message: "Member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(member);
  } catch (error) {
    console.error("Error fetching member:", error);
    return NextResponse.json(
      { message: "Failed to fetch member", error },
      { status: 500 }
    );
  }
}

// PATCH - Update a member
export async function PATCH(
  request: NextRequest,
  context: any
) {
  const { id } = context.params;

  try {
    const body = await request.json();
    const { name, description } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      );
    }

    const existingMember = await prisma.member.findUnique({
      where: { id },
    });

    if (!existingMember) {
      return NextResponse.json(
        { message: "Member not found" },
        { status: 404 }
      );
    }

    if (name.trim() !== existingMember.name) {
      const nameConflict = await prisma.member.findUnique({
        where: { name: name.trim() },
      });

      if (nameConflict) {
        return NextResponse.json(
          { message: "A member with this name already exists" },
          { status: 409 }
        );
      }
    }

    const updatedMember = await prisma.member.update({
      where: { id },
      data: {
        name: name.trim(),
        description: description?.trim() || null,
      },
      include: {
        office: true,
        dojHmo: true,
      },
    });

    return NextResponse.json(updatedMember);
  } catch (error) {
    console.error("Error updating member:", error);
    return NextResponse.json(
      { message: "Failed to update member" },
      { status: 500 }
    );
  }
}

// DELETE - Soft delete a member
export async function DELETE(
  request: NextRequest,
  context: any
) {
  const { id } = context.params;

  try {
    const existingMember = await prisma.member.findUnique({
      where: { id },
    });

    if (!existingMember) {
      return NextResponse.json(
        { message: "Member not found" },
        { status: 404 }
      );
    }

    const softDeletedMember = await prisma.member.update({
      where: { id },
      data: { active: false },
    });

    return NextResponse.json(
      {
        message: "Member deactivated successfully",
        member: softDeletedMember,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deactivating member:", error);
    return NextResponse.json(
      { message: "Failed to deactivate member", error },
      { status: 500 }
    );
  }
}

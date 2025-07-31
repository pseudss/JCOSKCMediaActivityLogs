import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const member = await prisma.member.findUnique({
      where: { id: params.id },
      include: {
        office: true
      }
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Check if member exists
    const existingMember = await prisma.member.findUnique({
      where: { id: params.id },
    });

    if (!existingMember) {
      return NextResponse.json(
        { message: "Member not found" },
        { status: 404 }
      );
    }

    // Check if name is being changed and if it conflicts with another member
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

    // Update member with provided fields
    const updatedMember = await prisma.member.update({
      where: { id: params.id },
      data: {
        name: name.trim(),
        description: description?.trim() || null
      },
      include: {
        office: true,
        dojHmo: true
      }
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if member exists
    const existingMember = await prisma.member.findUnique({
      where: { id: params.id },
    });

    if (!existingMember) {
      return NextResponse.json(
        { message: "Member not found" },
        { status: 404 }
      );
    }

    // Soft delete: Set status to inactive instead of actually deleting
    const softDeletedMember = await prisma.member.update({
      where: { id: params.id },
      data: { active: false },
    });

    return NextResponse.json(
      { 
        message: "Member deactivated successfully",
        member: softDeletedMember 
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

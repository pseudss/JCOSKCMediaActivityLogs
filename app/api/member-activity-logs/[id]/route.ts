import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch all active member activity logs
export async function GET() {
  try {
    const activityLogs = await prisma.memberActivityLog.findMany({
      where: {
        active: true,
      },
      include: {
        member: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(activityLogs);
  } catch (error) {
    console.error("Error fetching member activity logs:", error);
    return NextResponse.json(
      { error: "Failed to fetch member activity logs" },
      { status: 500 }
    );
  }
}

// POST - Create a new member activity log
export async function POST(request: NextRequest) {
  try {
    const { memberId, deviceIds, description, timeIn, timeOut } = await request.json();

    if (!memberId) {
      return NextResponse.json(
        { error: "Member is required" },
        { status: 400 }
      );
    }

    const member = await prisma.member.findUnique({
      where: { id: memberId, active: true },
    });

    if (!member) {
      return NextResponse.json(
        { error: "Member not found" },
        { status: 400 }
      );
    }

    const activityLog = await prisma.memberActivityLog.create({
      data: {
        memberId,
        deviceIds: JSON.stringify(deviceIds || []),
        description: description?.trim() || null,
        timeIn: timeIn ? new Date(timeIn) : null,
        timeOut: timeOut ? new Date(timeOut) : null,
      },
      include: {
        member: true,
      },
    });

    return NextResponse.json(activityLog, { status: 201 });
  } catch (error: any) {
    console.error("Error creating member activity log:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create member activity log" },
      { status: 500 }
    );
  }
}

// PUT - Update a member activity log
export async function PUT(
  request: NextRequest,
  context: any
) {
  const id = context.params?.id;

  try {
    const { memberId, deviceIds, description, timeIn, timeOut } = await request.json();

    if (!memberId) {
      return NextResponse.json(
        { error: "Member is required" },
        { status: 400 }
      );
    }

    const existingLog = await prisma.memberActivityLog.findUnique({
      where: { id },
    });

    if (!existingLog) {
      return NextResponse.json(
        { error: "Activity log not found" },
        { status: 404 }
      );
    }

    const member = await prisma.member.findUnique({
      where: { id: memberId, active: true },
    });

    if (!member) {
      return NextResponse.json(
        { error: "Member not found" },
        { status: 400 }
      );
    }

    const activityLog = await prisma.memberActivityLog.update({
      where: { id },
      data: {
        memberId,
        deviceIds: JSON.stringify(deviceIds || []),
        description: description?.trim() || null,
        timeIn: timeIn ? new Date(timeIn) : null,
        timeOut: timeOut ? new Date(timeOut) : null,
      },
      include: {
        member: true,
      },
    });

    return NextResponse.json(activityLog);
  } catch (error: any) {
    console.error("Error updating member activity log:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Activity log not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update member activity log" },
      { status: 500 }
    );
  }
}

// DELETE - Soft delete a member activity log
export async function DELETE(
  request: NextRequest,
  context: any
) {
  const id = context.params?.id;

  try {
    const activityLog = await prisma.memberActivityLog.update({
      where: { id },
      data: { active: false },
      include: {
        member: true,
      },
    });

    return NextResponse.json(activityLog);
  } catch (error: any) {
    console.error("Error deleting member activity log:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Activity log not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Failed to delete member activity log" },
      { status: 500 }
    );
  }
}

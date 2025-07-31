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

    console.log("Received data:", { memberId, deviceIds, description, timeIn, timeOut }); // Debug log

    if (!memberId) {
      return NextResponse.json(
        { error: "Member is required" },
        { status: 400 }
      );
    }

    // Validate member exists
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
        deviceIds: JSON.stringify(deviceIds || []), // Store as JSON string
        description: description?.trim() || null,
        timeIn: timeIn ? new Date(timeIn) : null,
        timeOut: timeOut ? new Date(timeOut) : null,
      },
      include: {
        member: true,
      },
    });

    console.log("Created activity log:", activityLog); // Debug log

    return NextResponse.json(activityLog, { status: 201 });
  } catch (error: any) {
    console.error("Error creating member activity log:", error);
    
    return NextResponse.json(
      { error: error.message || "Failed to create member activity log" },
      { status: 500 }
    );
  }
} 
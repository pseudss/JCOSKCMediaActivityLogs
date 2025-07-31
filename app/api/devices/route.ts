import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch all active devices
export async function GET() {
  try {
    const devices = await prisma.device.findMany({
      where: {
        active: true,
      },
      include: {
        deviceDistinctions: {
          include: {
            deviceDistinction: true
          }
        }
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(devices);
  } catch (error) {
    console.error("Error fetching devices:", error);
    return NextResponse.json(
      { error: "Failed to fetch devices" },
      { status: 500 }
    );
  }
}

// POST - Create a new device
export async function POST(request: NextRequest) {
  try {
    const { name, description, deviceDistinctionIds } = await request.json();

    if (!name || name.trim() === "") {
      return NextResponse.json(
        { error: "Device name is required" },
        { status: 400 }
      );
    }

    const device = await prisma.device.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        deviceDistinctions: {
          create: deviceDistinctionIds?.map((id: string) => ({
            deviceDistinctionId: id
          })) || []
        }
      },
      include: {
        deviceDistinctions: {
          include: {
            deviceDistinction: true
          }
        }
      },
    });

    return NextResponse.json(device, { status: 201 });
  } catch (error: any) {
    console.error("Error creating device:", error);
    
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Device name already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create device" },
      { status: 500 }
    );
  }
} 
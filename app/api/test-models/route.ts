import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Test if MemberActivityLog model exists
    const activityLogs = await prisma.memberActivityLog.findMany({
      take: 1
    });
    
    return NextResponse.json({
      success: true,
      message: "MemberActivityLog model exists",
      count: activityLogs.length
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code
    }, { status: 500 });
  }
} 
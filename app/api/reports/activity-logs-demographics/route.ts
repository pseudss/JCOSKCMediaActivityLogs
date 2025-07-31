import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Generate demographics report data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Build date filter
    const dateFilter: any = {};
    if (startDate || endDate) {
      dateFilter.createdAt = {};
      if (startDate) dateFilter.createdAt.gte = new Date(startDate);
      if (endDate) dateFilter.createdAt.lte = new Date(endDate);
    }

    // Fetch activity logs with member data
    const activityLogs = await prisma.memberActivityLog.findMany({
      where: {
        active: true,
        ...dateFilter
      },
      include: {
        member: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Fetch all devices for reference
    const devices = await prisma.device.findMany({
      where: { active: true },
      select: { id: true, name: true }
    });

    const deviceMap = new Map<string, string>(devices.map(d => [d.id, d.name]));

    // Process the data for demographics
    const demographicsData = activityLogs.map((log: any) => {
      const deviceIds = JSON.parse(log.deviceIds || '[]');
      const deviceNames = deviceIds.map((id: string) => deviceMap.get(id) || 'Unknown Device').join(', ');

      return {
        id: log.id,
        memberName: log.member.name,
        memberPosition: log.member.description || 'No Position',
        devicesUsed: deviceNames || 'No Devices',
        description: log.description || 'No Description',
        timeIn: log.timeIn ? new Date(log.timeIn).toLocaleString() : 'Not Set',
        timeOut: log.timeOut ? new Date(log.timeOut).toLocaleString() : 'Not Set',
        duration: log.timeIn && log.timeOut 
          ? Math.round((new Date(log.timeOut).getTime() - new Date(log.timeIn).getTime()) / (1000 * 60)) + ' minutes'
          : 'N/A',
        createdAt: new Date(log.createdAt).toLocaleString(),
        updatedAt: new Date(log.updatedAt).toLocaleString()
      };
    });

    // Generate summary statistics
    const totalLogs = demographicsData.length;
    const uniqueMembers = new Set(demographicsData.map((d: any) => d.memberName)).size;

    const totalDevices = new Set<string>(
      demographicsData.flatMap((log: any) =>
        (log.devicesUsed || '')
          .split(', ')
          .filter((deviceName: string) => 
            deviceName && deviceName !== 'No Devices' && deviceName !== 'Unknown Device')
      )
    ).size;

    // Calculate average duration
    const durations = demographicsData
      .filter((d: any) => d.duration !== 'N/A')
      .map((d: any) => parseInt(d.duration.split(' ')[0]));
      
    const avgDuration = durations.length > 0 
      ? Math.round(durations.reduce((a: number, b: number) => a + b, 0) / durations.length)
      : 0;

    const summary = {
      totalActivityLogs: totalLogs,
      uniqueMembers,
      totalDevicesUsed: totalDevices,
      averageDurationMinutes: avgDuration,
      dateRange: {
        startDate: startDate || 'All Time',
        endDate: endDate || 'All Time'
      }
    };

    return NextResponse.json({
      summary,
      data: demographicsData
    });
  } catch (error) {
    console.error("Error generating demographics report:", error);
    return NextResponse.json(
      { error: "Failed to generate demographics report" },
      { status: 500 }
    );
  }
}

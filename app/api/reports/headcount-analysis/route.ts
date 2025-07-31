import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Generate headcount analysis report data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get('includeInactive') === 'true';

    // Build filter
    const whereFilter: any = {};
    if (!includeInactive) {
      whereFilter.active = true;
    }

    // Fetch all members
    const members = await prisma.member.findMany({
      where: whereFilter,
      orderBy: {
        createdAt: 'asc',
      },
    });

    // Process the data for headcount analysis
    const headcountData = members.map(member => {
      return {
        id: member.id,
        name: member.name,
        position: member.description || 'No Position',
        status: member.active ? 'Active' : 'Inactive',
        createdAt: new Date(member.createdAt).toLocaleString(),
        updatedAt: new Date(member.updatedAt).toLocaleString(),
        memberSince: new Date(member.createdAt).toLocaleDateString()
      };
    });

    // Generate summary statistics
    const totalMembers = headcountData.length;
    const activeMembers = headcountData.filter(m => m.status === 'Active').length;
    const inactiveMembers = headcountData.filter(m => m.status === 'Inactive').length;
    
    // Position analysis
    const positionCounts = headcountData.reduce((acc, member) => {
      const position = member.position;
      acc[position] = (acc[position] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Monthly join analysis (last 12 months)
    const monthlyJoins = new Array(12).fill(0);
    const currentDate = new Date();
    
    headcountData.forEach(member => {
      const joinDate = new Date(member.createdAt);
      const monthsDiff = (currentDate.getFullYear() - joinDate.getFullYear()) * 12 + 
                        (currentDate.getMonth() - joinDate.getMonth());
      
      if (monthsDiff >= 0 && monthsDiff < 12) {
        monthlyJoins[11 - monthsDiff]++;
      }
    });

    const summary = {
      totalMembers,
      activeMembers,
      inactiveMembers,
      activePercentage: totalMembers > 0 ? Math.round((activeMembers / totalMembers) * 100) : 0,
      inactivePercentage: totalMembers > 0 ? Math.round((inactiveMembers / totalMembers) * 100) : 0,
      positionBreakdown: positionCounts,
      monthlyJoins,
      reportGenerated: new Date().toLocaleString(),
      includeInactive
    };

    return NextResponse.json({
      summary,
      data: headcountData
    });
  } catch (error) {
    console.error("Error generating headcount analysis:", error);
    return NextResponse.json(
      { error: "Failed to generate headcount analysis" },
      { status: 500 }
    );
  }
} 
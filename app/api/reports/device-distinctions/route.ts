import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Generate device and materials report data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get('includeInactive') === 'true';

    // Build filter
    const whereFilter: any = {};
    if (!includeInactive) {
      whereFilter.active = true;
    }

    // Fetch all devices with their distinctions
    const devices = await prisma.device.findMany({
      where: whereFilter,
      include: {
        deviceDistinctions: {
          include: {
            deviceDistinction: true
          }
        }
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    // Fetch all materials
    const materials = await prisma.material.findMany({
      where: whereFilter,
      orderBy: {
        createdAt: 'asc',
      },
    });

    // Process device data
    const deviceData = devices.map(device => {
      const distinctions = device.deviceDistinctions.map(dd => dd.deviceDistinction.name).join(', ');
      
      return {
        id: device.id,
        type: 'Device',
        name: device.name,
        description: device.description || 'No Description',
        status: device.active ? 'Active' : 'Inactive',
        distinctions: distinctions || 'No Distinctions',
        distinctionCount: device.deviceDistinctions.length,
        quantity: null,
        unit: null,
        createdAt: new Date(device.createdAt).toLocaleString(),
        updatedAt: new Date(device.updatedAt).toLocaleString(),
        itemSince: new Date(device.createdAt).toLocaleDateString()
      };
    });

    // Process material data
    const materialData = materials.map(material => {
      return {
        id: material.id,
        type: 'Material',
        name: material.name,
        description: material.description || 'No Description',
        status: material.active ? 'Active' : 'Inactive',
        distinctions: 'N/A',
        distinctionCount: 0,
        quantity: material.quantity,
        unit: material.unit || 'units',
        createdAt: new Date(material.createdAt).toLocaleString(),
        updatedAt: new Date(material.updatedAt).toLocaleString(),
        itemSince: new Date(material.createdAt).toLocaleDateString()
      };
    });

    // Combine device and material data
    const combinedData = [...deviceData, ...materialData];

    // Generate summary statistics
    const totalItems = combinedData.length;
    const totalDevices = deviceData.length;
    const totalMaterials = materialData.length;
    const activeItems = combinedData.filter(item => item.status === 'Active').length;
    const inactiveItems = combinedData.filter(item => item.status === 'Inactive').length;
    
    // Device-specific statistics
    const activeDevices = deviceData.filter(d => d.status === 'Active').length;
    const devicesWithDistinctions = deviceData.filter(d => d.distinctionCount > 0).length;
    const devicesWithoutDistinctions = deviceData.filter(d => d.distinctionCount === 0).length;
    
    // Material-specific statistics
    const activeMaterials = materialData.filter(m => m.status === 'Active').length;
    const totalMaterialQuantity = materialData.reduce((sum, material) => sum + (material.quantity || 0), 0);
    
    // Get all unique distinctions
    const allDistinctions = new Set<string>();
    devices.forEach(device => {
      device.deviceDistinctions.forEach(dd => {
        allDistinctions.add(dd.deviceDistinction.name);
      });
    });

    // Distinction usage analysis
    const distinctionUsage: Record<string, number> = {};
    devices.forEach(device => {
      device.deviceDistinctions.forEach(dd => {
        const distinctionName = dd.deviceDistinction.name;
        distinctionUsage[distinctionName] = (distinctionUsage[distinctionName] || 0) + 1;
      });
    });

    // Unit analysis for materials
    const unitUsage: Record<string, number> = {};
    materialData.forEach(material => {
      const unit = material.unit || 'units';
      unitUsage[unit] = (unitUsage[unit] || 0) + 1;
    });

    const summary = {
      totalItems,
      totalDevices,
      totalMaterials,
      activeItems,
      inactiveItems,
      activePercentage: totalItems > 0 ? Math.round((activeItems / totalItems) * 100) : 0,
      inactivePercentage: totalItems > 0 ? Math.round((inactiveItems / totalItems) * 100) : 0,
      
      // Device statistics
      activeDevices,
      devicesWithDistinctions,
      devicesWithoutDistinctions,
      totalDistinctions: allDistinctions.size,
      distinctionUsage,
      
      // Material statistics
      activeMaterials,
      totalMaterialQuantity,
      unitUsage,
      
      reportGenerated: new Date().toLocaleString(),
      includeInactive
    };

    return NextResponse.json({
      summary,
      data: combinedData
    });
  } catch (error) {
    console.error("Error generating device and materials report:", error);
    return NextResponse.json(
      { error: "Failed to generate device and materials report" },
      { status: 500 }
    );
  }
} 
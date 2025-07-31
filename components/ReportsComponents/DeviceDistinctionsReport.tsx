'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Download, Smartphone, Tag, BarChart3, PieChart, Package } from "lucide-react";
import { createAdvancedExcelFile } from "@/lib/advancedExcelExport";

interface ItemData {
  id: string;
  type: 'Device' | 'Material';
  name: string;
  description: string;
  status: string;
  distinctions: string;
  distinctionCount: number;
  quantity: number | null;
  unit: string | null;
  createdAt: string;
  updatedAt: string;
  itemSince: string;
}

interface SummaryData {
  totalItems: number;
  totalDevices: number;
  totalMaterials: number;
  activeItems: number;
  inactiveItems: number;
  activePercentage: number;
  inactivePercentage: number;
  activeDevices: number;
  devicesWithDistinctions: number;
  devicesWithoutDistinctions: number;
  totalDistinctions: number;
  distinctionUsage: Record<string, number>;
  activeMaterials: number;
  totalMaterialQuantity: number;
  unitUsage: Record<string, number>;
  reportGenerated: string;
  includeInactive: boolean;
}

interface ReportResponse {
  summary: SummaryData;
  data: ItemData[];
}

export function DeviceDistinctionsReport() {
  const [reportData, setReportData] = useState<ReportResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [includeInactive, setIncludeInactive] = useState(false);

  const generateReport = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams();
      if (includeInactive) params.append('includeInactive', 'true');
      
      const response = await fetch(`/api/reports/device-distinctions?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to generate report');
      }
      
      const data = await response.json();
      setReportData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = () => {
    if (!reportData) return;

    // Define headers with proper formatting
    const headers = [
      'Type',
      'Name',
      'Description',
      'Status',
      'Distinctions',
      'Distinction Count',
      'Quantity',
      'Unit',
      'Item Since',
      'Created At',
      'Updated At'
    ];

    // Transform data to match headers with proper formatting
    const excelData = reportData.data.map(row => ({
      'Type': row.type,
      'Name': row.name,
      'Description': row.description,
      'Status': row.status,
      'Distinctions': row.distinctions,
      'Distinction Count': row.distinctionCount,
      'Quantity': row.quantity || 'N/A',
      'Unit': row.unit || 'N/A',
      'Item Since': row.itemSince,
      'Created At': row.createdAt,
      'Updated At': row.updatedAt
    }));

    createAdvancedExcelFile(headers, excelData, 'Device-and-Materials-Report');
  };

  useEffect(() => {
    generateReport();
  }, [includeInactive]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Report Filters</CardTitle>
          <CardDescription>Configure device and materials analysis parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="includeInactive"
              checked={includeInactive}
              onCheckedChange={(checked) => setIncludeInactive(checked as boolean)}
            />
            <Label htmlFor="includeInactive" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Include Inactive Items
            </Label>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            When checked, the report will include both active and inactive devices and materials. When unchecked, only active items will be included.
          </p>
        </CardContent>
      </Card>

      {/* Summary */}
      {reportData && (
        <Card>
          <CardHeader>
            <CardTitle>Device and Materials Summary</CardTitle>
            <CardDescription>Overview of device and material distribution and statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{reportData.summary.totalItems}</div>
                <div className="text-sm text-gray-600">Total Items</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{reportData.summary.activeItems}</div>
                <div className="text-sm text-gray-600">Active Items</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{reportData.summary.totalDevices}</div>
                <div className="text-sm text-gray-600">Total Devices</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{reportData.summary.totalMaterials}</div>
                <div className="text-sm text-gray-600">Total Materials</div>
              </div>
            </div>

            {/* Detailed Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Device Statistics */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3 text-blue-800">Device Statistics</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Active Devices:</span>
                    <span className="font-medium">{reportData.summary.activeDevices}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>With Distinctions:</span>
                    <span className="font-medium">{reportData.summary.devicesWithDistinctions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Distinctions:</span>
                    <span className="font-medium">{reportData.summary.totalDistinctions}</span>
                  </div>
                </div>
              </div>

              {/* Material Statistics */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3 text-green-800">Material Statistics</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Active Materials:</span>
                    <span className="font-medium">{reportData.summary.activeMaterials}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Quantity:</span>
                    <span className="font-medium">{reportData.summary.totalMaterialQuantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Unique Units:</span>
                    <span className="font-medium">{Object.keys(reportData.summary.unitUsage).length}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Distinction Usage Breakdown */}
            {Object.keys(reportData.summary.distinctionUsage).length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Distinction Usage Breakdown</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {Object.entries(reportData.summary.distinctionUsage).map(([distinction, count]) => (
                    <div key={distinction} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{distinction}</span>
                      <span className="text-lg font-bold text-blue-600">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 text-center text-sm text-gray-500">
              Report generated: {reportData.summary.reportGenerated}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Export Button */}
      {reportData && (
        <div className="flex justify-end">
          <Button onClick={exportToExcel} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export to Excel (XLSX)
          </Button>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Data Table */}
      {reportData && (
        <Card>
          <CardHeader>
            <CardTitle>Detailed Item List</CardTitle>
            <CardDescription>
              {reportData.summary.includeInactive 
                ? 'All devices and materials (active and inactive)' 
                : 'Active devices and materials only'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-2 text-left">Type</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Name</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Description</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Status</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Distinctions</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Count</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Quantity</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Unit</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Item Since</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Created At</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Updated At</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.data.map((row, index) => (
                    <tr key={row.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-gray-300 px-3 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          row.type === 'Device' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {row.type}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-3 py-2 font-medium">{row.name}</td>
                      <td className="border border-gray-300 px-3 py-2">{row.description}</td>
                      <td className="border border-gray-300 px-3 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          row.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-3 py-2">{row.distinctions}</td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        {row.type === 'Device' ? (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            {row.distinctionCount}
                          </span>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        {row.type === 'Material' ? (
                          <span className="font-medium">{row.quantity}</span>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        {row.type === 'Material' ? row.unit : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="border border-gray-300 px-3 py-2">{row.itemSince}</td>
                      <td className="border border-gray-300 px-3 py-2">{row.createdAt}</td>
                      <td className="border border-gray-300 px-3 py-2">{row.updatedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 
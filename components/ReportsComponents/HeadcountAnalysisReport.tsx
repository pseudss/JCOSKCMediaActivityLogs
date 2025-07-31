'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Download, Users, UserCheck, UserX, TrendingUp } from "lucide-react";
import { createExcelCompatibleCSV } from "@/lib/excelExport";
import { createAdvancedExcelFile } from "@/lib/advancedExcelExport";

interface HeadcountData {
  id: string;
  name: string;
  position: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  memberSince: string;
}

interface SummaryData {
  totalMembers: number;
  activeMembers: number;
  inactiveMembers: number;
  activePercentage: number;
  inactivePercentage: number;
  positionBreakdown: Record<string, number>;
  monthlyJoins: number[];
  reportGenerated: string;
  includeInactive: boolean;
}

interface ReportResponse {
  summary: SummaryData;
  data: HeadcountData[];
}

export function HeadcountAnalysisReport() {
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
      
      const response = await fetch(`/api/reports/headcount-analysis?${params}`);
      
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
      'Member Name',
      'Position',
      'Status',
      'Member Since',
      'Created At',
      'Updated At'
    ];

    // Transform data to match headers with proper formatting
    const excelData = reportData.data.map(row => ({
      'Member Name': row.name,
      'Position': row.position,
      'Status': row.status,
      'Member Since': row.memberSince,
      'Created At': row.createdAt,
      'Updated At': row.updatedAt
    }));

    createAdvancedExcelFile(headers, excelData, 'Headcount-Analysis-Report');
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
          <CardDescription>Configure headcount analysis parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="includeInactive"
              checked={includeInactive}
              onCheckedChange={(checked) => setIncludeInactive(checked as boolean)}
            />
            <Label htmlFor="includeInactive" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Include Inactive Members
            </Label>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            When checked, the report will include both active and inactive members. When unchecked, only active members will be included.
          </p>
        </CardContent>
      </Card>

      {/* Summary */}
      {reportData && (
        <Card>
          <CardHeader>
            <CardTitle>Headcount Summary</CardTitle>
            <CardDescription>Overview of member distribution and statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{reportData.summary.totalMembers}</div>
                <div className="text-sm text-gray-600">Total Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{reportData.summary.activeMembers}</div>
                <div className="text-sm text-gray-600">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{reportData.summary.inactiveMembers}</div>
                <div className="text-sm text-gray-600">Inactive Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{reportData.summary.activePercentage}%</div>
                <div className="text-sm text-gray-600">Active Rate</div>
              </div>
            </div>

            {/* Position Breakdown */}
            {Object.keys(reportData.summary.positionBreakdown).length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Position Breakdown</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {Object.entries(reportData.summary.positionBreakdown).map(([position, count]) => (
                    <div key={position} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{position}</span>
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
            <CardTitle>Detailed Member List</CardTitle>
            <CardDescription>
              {reportData.summary.includeInactive 
                ? 'All members (active and inactive)' 
                : 'Active members only'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-2 text-left">Member Name</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Position</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Status</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Member Since</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Created At</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Updated At</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.data.map((row, index) => (
                    <tr key={row.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-gray-300 px-3 py-2 font-medium">{row.name}</td>
                      <td className="border border-gray-300 px-3 py-2">{row.position}</td>
                      <td className="border border-gray-300 px-3 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          row.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-3 py-2">{row.memberSince}</td>
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
'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Download, Calendar, Users, Smartphone, Clock } from "lucide-react";
import { createExcelCompatibleCSV } from "@/lib/excelExport";
import { createAdvancedExcelFile } from "@/lib/advancedExcelExport";

interface DemographicsData {
  id: string;
  memberName: string;
  memberPosition: string;
  devicesUsed: string;
  description: string;
  timeIn: string;
  timeOut: string;
  duration: string;
  createdAt: string;
  updatedAt: string;
}

interface SummaryData {
  totalActivityLogs: number;
  uniqueMembers: number;
  totalDevicesUsed: number;
  averageDurationMinutes: number;
  dateRange: {
    startDate: string;
    endDate: string;
  };
}

interface ReportResponse {
  summary: SummaryData;
  data: DemographicsData[];
}

export function ActivityLogsDemographicsReport() {
  const [reportData, setReportData] = useState<ReportResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const generateReport = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      
      const response = await fetch(`/api/reports/activity-logs-demographics?${params}`);
      
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
      'Devices Used',
      'Description',
      'Time In',
      'Time Out',
      'Duration',
      'Created At',
      'Updated At'
    ];

    // Transform data to match headers with proper formatting
    const excelData = reportData.data.map(row => ({
      'Member Name': row.memberName,
      'Position': row.memberPosition,
      'Devices Used': row.devicesUsed,
      'Description': row.description,
      'Time In': row.timeIn,
      'Time Out': row.timeOut,
      'Duration': row.duration,
      'Created At': row.createdAt,
      'Updated At': row.updatedAt
    }));

    createAdvancedExcelFile(headers, excelData, 'Activity-Logs-Demographics-Report');
  };

  useEffect(() => {
    generateReport();
  }, []);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Report Filters</CardTitle>
          <CardDescription>Select date range for the demographics report</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={generateReport} disabled={loading} className="w-full">
                {loading ? 'Generating...' : 'Generate Report'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      {reportData && (
        <Card>
          <CardHeader>
            <CardTitle>Summary Statistics</CardTitle>
            <CardDescription>Overview of activity logs demographics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{reportData.summary.totalActivityLogs}</div>
                <div className="text-sm text-gray-600">Total Logs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{reportData.summary.uniqueMembers}</div>
                <div className="text-sm text-gray-600">Unique Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{reportData.summary.totalDevicesUsed}</div>
                <div className="text-sm text-gray-600">Devices Used</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{reportData.summary.averageDurationMinutes}</div>
                <div className="text-sm text-gray-600">Avg Duration (min)</div>
              </div>
            </div>
            <div className="mt-4 text-center text-sm text-gray-500">
              Date Range: {reportData.summary.dateRange.startDate} to {reportData.summary.dateRange.endDate}
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
            <CardTitle>Detailed Report</CardTitle>
            <CardDescription>Member activity logs with device usage and time tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-2 text-left">Member</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Position</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Devices</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Description</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Time In</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Time Out</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.data.map((row, index) => (
                    <tr key={row.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-gray-300 px-3 py-2">{row.memberName}</td>
                      <td className="border border-gray-300 px-3 py-2">{row.memberPosition}</td>
                      <td className="border border-gray-300 px-3 py-2">{row.devicesUsed}</td>
                      <td className="border border-gray-300 px-3 py-2">{row.description}</td>
                      <td className="border border-gray-300 px-3 py-2">{row.timeIn}</td>
                      <td className="border border-gray-300 px-3 py-2">{row.timeOut}</td>
                      <td className="border border-gray-300 px-3 py-2">{row.duration}</td>
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
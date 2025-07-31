'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BarChart3, PieChart, Smartphone } from "lucide-react";
import { ActivityLogsDemographicsReport } from "@/components/ReportsComponents/ActivityLogsDemographicsReport";
import { HeadcountAnalysisReport } from "@/components/ReportsComponents/HeadcountAnalysisReport";
import { DeviceDistinctionsReport } from "@/components/ReportsComponents/DeviceDistinctionsReport";

type ReportType = 'demographics' | 'headcount' | 'deviceDistinctions' | null;

export default function ReportsPage() {
    const [activeReport, setActiveReport] = useState<ReportType>(null);

    const handleReportClick = (reportType: ReportType) => {
        if (activeReport === reportType) {
            // If clicking the same report, hide it
            setActiveReport(null);
        } else {
            // Show the clicked report and hide others
            setActiveReport(reportType);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Reports</h1>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Activity Logs Demographics</CardTitle>
                        <CardDescription>Member device used time in</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                        <PieChart className="h-32 w-32 text-primary mb-4" />
                        <Button 
                            variant={activeReport === 'demographics' ? 'default' : 'outline'} 
                            className="w-full" 
                            onClick={() => handleReportClick('demographics')}
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            {activeReport === 'demographics' ? 'Hide Report' : 'Generate Report'}
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Headcount Analysis</CardTitle>
                        <CardDescription>Member count by status and position</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                        <BarChart3 className="h-32 w-32 text-primary mb-4" />
                        <Button 
                            variant={activeReport === 'headcount' ? 'default' : 'outline'} 
                            className="w-full" 
                            onClick={() => handleReportClick('headcount')}
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            {activeReport === 'headcount' ? 'Hide Report' : 'Generate Report'}
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Device and Materials</CardTitle>
                        <CardDescription>Devices with distinctions and materials analysis</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                        <Smartphone className="h-32 w-32 text-primary mb-4" />
                        <Button 
                            variant={activeReport === 'deviceDistinctions' ? 'default' : 'outline'} 
                            className="w-full" 
                            onClick={() => handleReportClick('deviceDistinctions')}
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            {activeReport === 'deviceDistinctions' ? 'Hide Report' : 'Generate Report'}
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Demographics Report Section */}
            {activeReport === 'demographics' && (
                <div className="mt-8">
                    <ActivityLogsDemographicsReport />
                </div>
            )}

            {/* Headcount Analysis Report Section */}
            {activeReport === 'headcount' && (
                <div className="mt-8">
                    <HeadcountAnalysisReport />
                </div>
            )}

            {/* Device and Materials Report Section */}
            {activeReport === 'deviceDistinctions' && (
                <div className="mt-8">
                    <DeviceDistinctionsReport />
                </div>
            )}
        </div>
    )
}

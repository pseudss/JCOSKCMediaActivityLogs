import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Printer, BarChart3, PieChart, LineChart } from "lucide-react"

export default function ReportsPage() {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Reports</h1>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                    <Button variant="outline">
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="hr" className="mb-6">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="hr">HR Reports</TabsTrigger>
                    <TabsTrigger value="payroll">Payroll Reports</TabsTrigger>
                    <TabsTrigger value="leave">Leave Reports</TabsTrigger>
                    <TabsTrigger value="training">Training Reports</TabsTrigger>
                    <TabsTrigger value="custom">Custom Reports</TabsTrigger>
                </TabsList>

                <TabsContent value="hr" className="mt-6">
                    <div className="grid gap-6 md:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Employee Demographics</CardTitle>
                                <CardDescription>Age, gender, and department distribution</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center">
                                <PieChart className="h-32 w-32 text-primary mb-4" />
                                <Button variant="outline" className="w-full">
                                    <FileText className="mr-2 h-4 w-4" />
                                    Generate Report
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Headcount Analysis</CardTitle>
                                <CardDescription>Employee count by department and position</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center">
                                <BarChart3 className="h-32 w-32 text-primary mb-4" />
                                <Button variant="outline" className="w-full">
                                    <FileText className="mr-2 h-4 w-4" />
                                    Generate Report
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Turnover Rate</CardTitle>
                                <CardDescription>Employee retention and turnover statistics</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center">
                                <LineChart className="h-32 w-32 text-primary mb-4" />
                                <Button variant="outline" className="w-full">
                                    <FileText className="mr-2 h-4 w-4" />
                                    Generate Report
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="payroll" className="mt-6">
                    <div className="grid gap-6 md:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Salary Distribution</CardTitle>
                                <CardDescription>Salary ranges by department and position</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center">
                                <BarChart3 className="h-32 w-32 text-primary mb-4" />
                                <Button variant="outline" className="w-full">
                                    <FileText className="mr-2 h-4 w-4" />
                                    Generate Report
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Payroll Summary</CardTitle>
                                <CardDescription>Monthly and quarterly payroll summaries</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center">
                                <LineChart className="h-32 w-32 text-primary mb-4" />
                                <Button variant="outline" className="w-full">
                                    <FileText className="mr-2 h-4 w-4" />
                                    Generate Report
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Tax Withholding</CardTitle>
                                <CardDescription>Tax withholding and remittance reports</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center">
                                <PieChart className="h-32 w-32 text-primary mb-4" />
                                <Button variant="outline" className="w-full">
                                    <FileText className="mr-2 h-4 w-4" />
                                    Generate Report
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="leave" className="mt-6">
                    <p>Leave reports content would go here</p>
                </TabsContent>

                <TabsContent value="training" className="mt-6">
                    <p>Training reports content would go here</p>
                </TabsContent>

                <TabsContent value="custom" className="mt-6">
                    <p>Custom reports content would go here</p>
                </TabsContent>
            </Tabs>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Report Generator</CardTitle>
                            <CardDescription>Create custom reports</CardDescription>
                        </div>
                        <Button>Create New Report</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                        <div>
                            <label className="block text-sm font-medium mb-2">Report Type</label>
                            <Select defaultValue="employee">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select report type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="employee">Employee Report</SelectItem>
                                    <SelectItem value="payroll">Payroll Report</SelectItem>
                                    <SelectItem value="leave">Leave Report</SelectItem>
                                    <SelectItem value="training">Training Report</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Time Period</label>
                            <Select defaultValue="monthly">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select time period" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="weekly">Weekly</SelectItem>
                                    <SelectItem value="monthly">Monthly</SelectItem>
                                    <SelectItem value="quarterly">Quarterly</SelectItem>
                                    <SelectItem value="yearly">Yearly</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Format</label>
                            <Select defaultValue="pdf">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select format" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pdf">PDF</SelectItem>
                                    <SelectItem value="excel">Excel</SelectItem>
                                    <SelectItem value="csv">CSV</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
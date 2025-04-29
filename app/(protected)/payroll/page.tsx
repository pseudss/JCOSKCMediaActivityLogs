import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, Calendar, FileText, Download, Printer } from 'lucide-react'

export default function PayrollPage() {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Payroll Management</h1>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Calendar className="mr-2 h-4 w-4" />
                        Payroll Calendar
                    </Button>
                    <Button>
                        <DollarSign className="mr-2 h-4 w-4" />
                        Process Payroll
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 mb-6 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle>Current Payroll</CardTitle>
                        <CardDescription>March 1-15, 2023</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">₱1,245,678.90</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle>Employees Processed</CardTitle>
                        <CardDescription>For current payroll period</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">235</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle>Pending Approvals</CardTitle>
                        <CardDescription>Awaiting final approval</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">3</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="mb-6">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Payroll Period</CardTitle>
                            <CardDescription>Select payroll period to view</CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Select defaultValue="march-1-2023">
                                <SelectTrigger className="w-[240px]">
                                    <SelectValue placeholder="Select period" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="march-1-2023">March 1-15, 2023</SelectItem>
                                    <SelectItem value="feb-16-2023">February 16-28, 2023</SelectItem>
                                    <SelectItem value="feb-1-2023">February 1-15, 2023</SelectItem>
                                    <SelectItem value="jan-16-2023">January 16-31, 2023</SelectItem>
                                </SelectContent>
                            </Select>
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
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="summary">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="summary">Summary</TabsTrigger>
                            <TabsTrigger value="details">Detailed View</TabsTrigger>
                            <TabsTrigger value="deductions">Deductions</TabsTrigger>
                        </TabsList>

                        <TabsContent value="summary" className="mt-4">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Department</TableHead>
                                        <TableHead>Employees</TableHead>
                                        <TableHead>Basic Salary</TableHead>
                                        <TableHead>Allowances</TableHead>
                                        <TableHead>Deductions</TableHead>
                                        <TableHead>Net Pay</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>IT Department</TableCell>
                                        <TableCell>45</TableCell>
                                        <TableCell>₱450,000.00</TableCell>
                                        <TableCell>₱67,500.00</TableCell>
                                        <TableCell>₱112,500.00</TableCell>
                                        <TableCell>₱405,000.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Human Resources</TableCell>
                                        <TableCell>12</TableCell>
                                        <TableCell>₱180,000.00</TableCell>
                                        <TableCell>₱27,000.00</TableCell>
                                        <TableCell>₱45,000.00</TableCell>
                                        <TableCell>₱162,000.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Finance</TableCell>
                                        <TableCell>18</TableCell>
                                        <TableCell>₱270,000.00</TableCell>
                                        <TableCell>₱40,500.00</TableCell>
                                        <TableCell>₱67,500.00</TableCell>
                                        <TableCell>₱243,000.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Marketing</TableCell>
                                        <TableCell>15</TableCell>
                                        <TableCell>₱225,000.00</TableCell>
                                        <TableCell>₱33,750.00</TableCell>
                                        <TableCell>₱56,250.00</TableCell>
                                        <TableCell>₱202,500.00</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TabsContent>

                        <TabsContent value="details" className="mt-4">
                            <p>Detailed payroll information would go here</p>
                        </TabsContent>

                        <TabsContent value="deductions" className="mt-4">
                            <p>Deductions breakdown would go here</p>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Payroll Reports</CardTitle>
                    <CardDescription>Generate and view payroll reports</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">Monthly Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <p className="text-sm text-muted-foreground mb-4">Monthly payroll summary reports</p>
                                <Button variant="outline" size="sm" className="w-full">
                                    <FileText className="mr-2 h-4 w-4" />
                                    Generate Report
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">Tax Reports</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <p className="text-sm text-muted-foreground mb-4">Tax withholding and remittance reports</p>
                                <Button variant="outline" size="sm" className="w-full">
                                    <FileText className="mr-2 h-4 w-4" />
                                    Generate Report
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">Benefits Reports</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <p className="text-sm text-muted-foreground mb-4">Employee benefits and contributions</p>
                                <Button variant="outline" size="sm" className="w-full">
                                    <FileText className="mr-2 h-4 w-4" />
                                    Generate Report
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

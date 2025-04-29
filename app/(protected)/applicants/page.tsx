import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserPlus, FileText, Calendar, CheckCircle } from "lucide-react"

export default function ApplicantsPage() {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Applicant Management</h1>
                <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add New Applicant
                </Button>
            </div>

            <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All Applicants</TabsTrigger>
                    <TabsTrigger value="screening">Screening</TabsTrigger>
                    <TabsTrigger value="interview">Interview</TabsTrigger>
                    <TabsTrigger value="hired">Hired</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle>New Applications</CardTitle>
                                <CardDescription>Review and process new job applications</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <FileText className="h-8 w-8 text-primary" />
                                    <span className="text-2xl font-bold">24</span>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full">
                                    View Applications
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle>Scheduled Interviews</CardTitle>
                                <CardDescription>Upcoming interviews with applicants</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <Calendar className="h-8 w-8 text-primary" />
                                    <span className="text-2xl font-bold">12</span>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full">
                                    Manage Interviews
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle>Ready for Hiring</CardTitle>
                                <CardDescription>Applicants ready to be converted to employees</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <CheckCircle className="h-8 w-8 text-primary" />
                                    <span className="text-2xl font-bold">5</span>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full">
                                    Process Hiring
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </TabsContent>

                {/* Other tab contents would be similar */}
                <TabsContent value="screening" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Applicants in Screening Phase</CardTitle>
                            <CardDescription>Review applications and schedule initial assessments</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Content for screening tab would go here</p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="interview" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Applicants in Interview Phase</CardTitle>
                            <CardDescription>Manage interviews and evaluate candidates</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Content for interview tab would go here</p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="hired" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Hired Applicants</CardTitle>
                            <CardDescription>Recently hired applicants pending employee setup</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Content for hired tab would go here</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}


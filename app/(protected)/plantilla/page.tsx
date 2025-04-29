import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Plus } from "lucide-react"
import { positions } from "@/lib/plantilla_data"

export default function PlantillaPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Plantilla Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create New Position
        </Button>
      </div>

      <div className="grid gap-6 mb-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Positions</CardTitle>
            <CardDescription>All defined positions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">42</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Filled Positions</CardTitle>
            <CardDescription>Positions with assigned employees</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">35</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Vacant Positions</CardTitle>
            <CardDescription>Available positions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">7</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Departments</CardTitle>
            <CardDescription>Total departments</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">8</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Position Directory</CardTitle>
          <CardDescription>View and manage position information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search positions..." className="pl-8" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>

          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="filled">Filled</TabsTrigger>
              <TabsTrigger value="unfilled">Unfilled</TabsTrigger>
            </TabsList>

            <TabsContent value="active">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Position Title</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Salary Grade</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Count</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {positions.map((position) => (
                      <TableRow key={position.id}>
                        <TableCell>{position.id}</TableCell>
                        <TableCell>{position.title}</TableCell>
                        <TableCell>{position.department}</TableCell>
                        <TableCell>{position.salary_grade}</TableCell>
                        <TableCell>
                          <Badge variant={position.status === "Filled" ? "default" : "secondary"}>
                            {position.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{position.count}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="filled">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Position Title</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Salary Grade</TableHead>
                      <TableHead>Employee</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {positions
                      .filter((p) => p.status === "Filled")
                      .map((position) => (
                        <TableRow key={position.id}>
                          <TableCell>{position.id}</TableCell>
                          <TableCell>{position.title}</TableCell>
                          <TableCell>{position.department}</TableCell>
                          <TableCell>{position.salary_grade}</TableCell>
                          <TableCell>John Doe</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="unfilled">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Position Title</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Salary Grade</TableHead>
                      <TableHead>Date Vacant</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {positions
                      .filter((p) => p.status === "Vacant")
                      .map((position) => (
                        <TableRow key={position.id}>
                          <TableCell>{position.id}</TableCell>
                          <TableCell>{position.title}</TableCell>
                          <TableCell>{position.department}</TableCell>
                          <TableCell>{position.salary_grade}</TableCell>
                          <TableCell>2023-02-15</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                            <Button variant="ghost" size="sm">
                              Fill Position
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}


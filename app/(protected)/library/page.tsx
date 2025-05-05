"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Plus, Briefcase, Building, Table2 } from "lucide-react"
import { useState } from "react"
import { salaryGrades } from "@/lib/salary_grades"
import { plantillaPositions } from "@/lib/plantilla_positions"
import { offices } from "@/lib/offices"

export default function LibraryPage() {
  const [activeCategory, setActiveCategory] = useState("plantilla")
  const [selectedYear, setSelectedYear] = useState("2024")

  const availableYears = Object.keys(salaryGrades).sort().reverse()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Library</h1>
      </div>

      <div className="flex gap-6">
        <div className="w-1/4">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col w-full">
                <button
                  className={`flex items-center gap-2 px-4 py-3 w-full text-left hover:bg-muted transition-colors ${activeCategory === "plantilla" ? "bg-muted text-primary" : ""}`}
                  onClick={() => setActiveCategory("plantilla")}
                >
                  <Briefcase className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">Plantilla</span>
                </button>
                <button
                  className={`flex items-center gap-2 px-4 py-3 w-full text-left hover:bg-muted transition-colors ${activeCategory === "offices" ? "bg-muted text-primary" : ""}`}
                  onClick={() => setActiveCategory("offices")}
                >
                  <Building className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">Offices</span>
                </button>
                <button
                  className={`flex items-center gap-2 px-4 py-3 w-full text-left hover:bg-muted transition-colors ${activeCategory === "salary-grades" ? "bg-muted text-primary" : ""}`}
                  onClick={() => setActiveCategory("salary-grades")}
                >
                  <Table2 className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">Salary Grades</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-3/4">
          {activeCategory === "plantilla" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Plantilla Library</CardTitle>
                  <CardDescription>Manage position templates for the agency</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Plantilla
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                      <DialogTitle>Add New Plantilla Position</DialogTitle>
                      <DialogDescription>Create a new plantilla position to be used in the agency.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <Label htmlFor="title">Position Title</Label>
                          <Input id="title" placeholder="e.g. Information Technology Officer II" />
                        </div>
                        <div>
                          <Label htmlFor="salary-grade">Salary Grade</Label>
                          <Select>
                            <SelectTrigger id="salary-grade">
                              <SelectValue placeholder="Select salary grade" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 33 }, (_, i) => i + 1).map((sg) => (
                                <SelectItem key={sg} value={sg.toString()}>
                                  SG-{sg}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="monthly-salary">Monthly Salary (2024)</Label>
                          <Input id="monthly-salary" placeholder="e.g. ₱54,385" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="education">Education Requirement</Label>
                        <Input id="education" placeholder="e.g. Bachelor's Degree relevant to the job" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="experience">Experience Requirement</Label>
                          <Input id="experience" placeholder="e.g. 2 years of relevant experience" />
                        </div>
                        <div>
                          <Label htmlFor="training">Training Requirement</Label>
                          <Input id="training" placeholder="e.g. 8 hours of relevant training" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="eligibility">Eligibility Requirement</Label>
                        <Input
                          id="eligibility"
                          placeholder="e.g. Career Service Professional (2nd Level Eligibility)"
                        />
                      </div>
                      <div>
                        <Label htmlFor="duties">Duties and Responsibilities</Label>
                        <Textarea
                          id="duties"
                          placeholder="Enter duties and responsibilities, one per line"
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save Plantilla</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-100 text-blue-800 p-4 rounded-md mb-6">
                  <div className="font-medium mb-2">
                    Plantilla positions are templates for job positions in the agency.
                  </div>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Create plantilla templates here before adding them to your active plantilla.</li>
                    <li>Plantilla templates define the requirements and duties for each position.</li>
                    <li>Use the "Add to Active Plantilla" button to create actual positions from these templates.</li>
                  </ul>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search plantilla positions..." className="pl-8" />
                  </div>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Position Title</TableHead>
                        <TableHead>Salary Grade</TableHead>
                        <TableHead>Monthly Salary</TableHead>
                        <TableHead>Eligibility</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {plantillaPositions.map((position) => (
                        <TableRow key={position.id}>
                          <TableCell>{position.id}</TableCell>
                          <TableCell>{position.title}</TableCell>
                          <TableCell>{position.salaryGrade}</TableCell>
                          <TableCell>{position.monthlySalary}</TableCell>
                          <TableCell>{position.eligibility}</TableCell>
                          <TableCell className="text-right">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[625px]">
                                <DialogHeader>
                                  <DialogTitle>{position.title}</DialogTitle>
                                  <DialogDescription>Plantilla Position Details</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-muted-foreground">Salary Grade</Label>
                                      <p className="font-medium">{position.salaryGrade}</p>
                                    </div>
                                    <div>
                                      <Label className="text-muted-foreground">Monthly Salary (2024)</Label>
                                      <p className="font-medium">{position.monthlySalary}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <Label className="text-muted-foreground">Education Requirement</Label>
                                    <p className="font-medium">{position.education}</p>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-muted-foreground">Experience Requirement</Label>
                                      <p className="font-medium">{position.experience}</p>
                                    </div>
                                    <div>
                                      <Label className="text-muted-foreground">Training Requirement</Label>
                                      <p className="font-medium">{position.training}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <Label className="text-muted-foreground">Eligibility Requirement</Label>
                                    <p className="font-medium">{position.eligibility}</p>
                                  </div>
                                  <div>
                                    <Label className="text-muted-foreground">Duties and Responsibilities</Label>
                                    <ul className="list-disc pl-5 mt-2 space-y-1">
                                      {position.duties.map((duty, index) => (
                                        <li key={index}>{duty}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline">Edit</Button>
                                  <Button>Add to Active Plantilla</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm">
                              Use
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {activeCategory === "offices" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Offices</CardTitle>
                  <CardDescription>Manage organizational structure and departments</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Office
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                      <DialogTitle>Add New Office</DialogTitle>
                      <DialogDescription>Create a new office or department in the organization.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <Label htmlFor="office-name">Office Name</Label>
                          <Input id="office-name" placeholder="e.g. Information Technology Department" />
                        </div>
                        <div>
                          <Label htmlFor="office-code">Office Code</Label>
                          <Input id="office-code" placeholder="e.g. ITD" />
                        </div>
                        <div>
                          <Label htmlFor="office-head">Office Head</Label>
                          <Input id="office-head" placeholder="e.g. John Smith" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="office-location">Location</Label>
                        <Input id="office-location" placeholder="e.g. 5th Floor, Main Building" />
                      </div>
                      <div>
                        <Label htmlFor="office-description">Description</Label>
                        <Textarea
                          id="office-description"
                          placeholder="Enter office description and responsibilities"
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save Office</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-100 text-blue-800 p-4 rounded-md mb-6">
                  <div className="font-medium mb-2">Offices define the organizational structure of your agency.</div>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Create and manage departments, divisions, and units.</li>
                    <li>Assign office heads and define reporting relationships.</li>
                    <li>Offices are used for employee assignments and organizational reporting.</li>
                  </ul>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search offices..." className="pl-8" />
                  </div>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Office Name</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Head</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {offices.map((office) => (
                        <TableRow key={office.id}>
                          <TableCell>{office.id}</TableCell>
                          <TableCell>{office.name}</TableCell>
                          <TableCell>{office.code}</TableCell>
                          <TableCell>{office.head}</TableCell>
                          <TableCell>{office.location}</TableCell>
                          <TableCell className="text-right">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[625px]">
                                <DialogHeader>
                                  <DialogTitle>{office.name}</DialogTitle>
                                  <DialogDescription>Office Details</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-muted-foreground">Office Code</Label>
                                      <p className="font-medium">{office.code}</p>
                                    </div>
                                    <div>
                                      <Label className="text-muted-foreground">Office Head</Label>
                                      <p className="font-medium">{office.head}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <Label className="text-muted-foreground">Location</Label>
                                    <p className="font-medium">{office.location}</p>
                                  </div>
                                  <div>
                                    <Label className="text-muted-foreground">Description</Label>
                                    <p className="font-medium">{office.description}</p>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline">Edit</Button>
                                  <Button>Manage Staff</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm">
                              Manage
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {activeCategory === "salary-grades" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Salary Grade Table</CardTitle>
                  <CardDescription>Standardized salary grades and steps</CardDescription>
                </div>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableYears.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-100 text-blue-800 p-4 rounded-md mb-6">
                  <div className="font-medium mb-2">Salary Grade Tables define standardized compensation.</div>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Salary grades are used to determine employee compensation based on position.</li>
                    <li>Each salary grade has 8 steps to account for length of service and performance.</li>
                    <li>Tables are updated annually based on government compensation circulars.</li>
                  </ul>
                </div>

                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-bold">Salary Grade</TableHead>
                        <TableHead>Step 1</TableHead>
                        <TableHead>Step 2</TableHead>
                        <TableHead>Step 3</TableHead>
                        <TableHead>Step 4</TableHead>
                        <TableHead>Step 5</TableHead>
                        <TableHead>Step 6</TableHead>
                        <TableHead>Step 7</TableHead>
                        <TableHead>Step 8</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(salaryGrades[selectedYear] || {}).map(([grade, steps]) => (
                        <TableRow key={grade}>
                          <TableCell className="font-medium">{grade}</TableCell>
                          {Object.values(steps).map((salary, index) => (
                            <TableCell key={index}>₱{salary.toLocaleString()}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

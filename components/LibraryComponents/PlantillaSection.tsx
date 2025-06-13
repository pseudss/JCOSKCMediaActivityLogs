import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { plantillaPositions, PlantillaPosition } from "@/lib/plantilla_positions"; // Assuming PlantillaPosition type is exported
import { Filter, Plus, Search } from "lucide-react";
import React from "react";

interface PlantillaSectionProps {
  // Add any necessary props, e.g., for handling data mutations if forms become functional
}

export function PlantillaSection({}: PlantillaSectionProps) {
  // TODO: Implement state and handlers for search, filter, and form submissions
  return (
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
              {plantillaPositions.map((position: PlantillaPosition) => ( // Added type annotation
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
  );
}
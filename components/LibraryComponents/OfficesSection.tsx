import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { offices, Office } from "@/lib/offices"; // Assuming Office type is exported
import { Filter, Plus, Search } from "lucide-react";
import React from "react";

interface OfficesSectionProps {
  // Add any necessary props
}

export function OfficesSection({}: OfficesSectionProps) {
  // TODO: Implement state and handlers for search, filter, and form submissions
  return (
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
              {offices.map((office: Office) => ( // Added type annotation
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
  );
}
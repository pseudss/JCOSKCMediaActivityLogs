"use client"

import type React from "react"

import { useState } from "react"
import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  Users,
  Mail,
  Phone,
  Calendar,
  Heart,
  Upload,
  Trash2,
  Download,
  Eye,
  Clock,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Employee } from "@/lib/employee_records"

interface EmployeeDetailProps {
  employee: Employee
}

interface PersonName {
  firstName: string
  lastName: string
  middleName?: string
  nameExtension?: string
}

export function EmployeeDetail({ employee }: EmployeeDetailProps) {
  const [newAttachment, setNewAttachment] = useState<File | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("Personal Information")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewAttachment(e.target.files[0])
    }
  }

  const handleUpload = () => {
    // In a real application, you would upload the file to your server
    // and update the attachments list
    alert("File upload functionality would be implemented here")
    setNewAttachment(null)
  }

  const calculateAge = (dateOfBirth: string): number => {
    const birthDate = new Date(dateOfBirth)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDifference = today.getMonth() - birthDate.getMonth()
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const formatEmployeeName = (person: PersonName): string => {
    let name = person.firstName
    if (person.middleName) {
      name += ` ${person.middleName.charAt(0)}.`
    }
    name += ` ${person.lastName}`
    if (person.nameExtension) {
      name += ` ${person.nameExtension}`
    }
    return name.trim()
  }

  const formatAddress = (address: Employee["personalInfo"]["address"]["residential"] | Employee["personalInfo"]["address"]["permanent"]): string => {
    let formattedAddress = `${address.houseNumber} ${address.street},`
    if (address.subdivision) {
      formattedAddress += ` ${address.subdivision},`
    }
    formattedAddress += ` ${address.barangay}, ${address.city}, ${address.province} ${address.zipCode}`
    return formattedAddress.replace(/ ,/g, ",").replace(/,+/g, ",").trim()
  }

  return (
    <div>
      <div className="flex flex-col gap-6">
        {/* Employee Header */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-shrink-0">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage
                src={`/placeholder.svg?height=128&width=128`}
                alt={`${employee.personalInfo.firstName} ${employee.personalInfo.lastName}`}
              />
              <AvatarFallback className="text-4xl">
                {employee.personalInfo.firstName.charAt(0)}
                {employee.personalInfo.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">
                  {formatEmployeeName(employee.personalInfo)}
                </h1>
                <p className="text-xl text-muted-foreground">
                  {employee.workExperience[employee.workExperience.length - 1].positionTitle}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3" />
                    {employee.workExperience[employee.workExperience.length - 1].department}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {employee.personalInfo.email}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {employee.personalInfo.mobileNumber}
                  </Badge>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline">Edit Profile</Button>
                <Button>Actions</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Employee ID</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{employee.personalInfo.agencyEmployeeNumber}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Department</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base font-medium truncate">
                    {employee.workExperience[employee.workExperience.length - 1].department}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge className="bg-green-500">
                    {employee.workExperience[employee.workExperience.length - 1].status}
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-7 w-full">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="family">Family</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="work">Work Experience</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="other">Other Info</TabsTrigger>
            <TabsTrigger value="attachments">Attachments</TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>Employee's personal and contact details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-muted-foreground">Date of Birth</Label>
                          <p className="font-medium">
                            {new Date(employee.personalInfo.dateOfBirth).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Place of Birth</Label>
                          <p className="font-medium">{employee.personalInfo.placeOfBirth}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-muted-foreground">Sex</Label>
                          <p className="font-medium">{employee.personalInfo.sex}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Civil Status</Label>
                          <p className="font-medium">{employee.personalInfo.civilStatus}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label className="text-muted-foreground">Height (m)</Label>
                          <p className="font-medium">{employee.personalInfo.height}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Weight (kg)</Label>
                          <p className="font-medium">{employee.personalInfo.weight}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Blood Type</Label>
                          <p className="font-medium">{employee.personalInfo.bloodType}</p>
                        </div>
                      </div>

                      <div>
                        <Label className="text-muted-foreground">Citizenship</Label>
                        <p className="font-medium">{employee.personalInfo.citizenship}</p>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold mt-6 mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-muted-foreground">Email Address</Label>
                        <p className="font-medium">{employee.personalInfo.email}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-muted-foreground">Mobile Number</Label>
                          <p className="font-medium">{employee.personalInfo.mobileNumber}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Telephone Number</Label>
                          <p className="font-medium">{employee.personalInfo.telephoneNumber || "N/A"}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Government IDs</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-muted-foreground">GSIS ID</Label>
                          <p className="font-medium">{employee.personalInfo.gsisId}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">PAG-IBIG ID</Label>
                          <p className="font-medium">{employee.personalInfo.pagIbigId}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-muted-foreground">PhilHealth Number</Label>
                          <p className="font-medium">{employee.personalInfo.philHealthNumber}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">SSS Number</Label>
                          <p className="font-medium">{employee.personalInfo.sssNumber}</p>
                        </div>
                      </div>

                      <div>
                        <Label className="text-muted-foreground">TIN</Label>
                        <p className="font-medium">{employee.personalInfo.tin}</p>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold mt-6 mb-4">Address Information</h3>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-muted-foreground">Residential Address</Label>
                        <p className="font-medium">
                          {formatAddress(employee.personalInfo.address.residential)}
                        </p>
                      </div>

                      <div>
                        <Label className="text-muted-foreground">Permanent Address</Label>
                        <p className="font-medium">
                          {formatAddress(employee.personalInfo.address.permanent)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Family Background Tab */}
          <TabsContent value="family" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Family Background
                </CardTitle>
                <CardDescription>Employee's family information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Spouse Information</h3>
                    {employee.familyBackground.spouse ? (
                      <div className="space-y-4">
                        <div>
                          <Label className="text-muted-foreground">Full Name</Label>
                          <p className="font-medium">
                            {formatEmployeeName(employee.familyBackground.spouse)}
                          </p>
                        </div>

                        <div>
                          <Label className="text-muted-foreground">Occupation</Label>
                          <p className="font-medium">{employee.familyBackground.spouse.occupation}</p>
                        </div>

                        <div>
                          <Label className="text-muted-foreground">Employer/Business Name</Label>
                          <p className="font-medium">{employee.familyBackground.spouse.employerName}</p>
                        </div>

                        <div>
                          <Label className="text-muted-foreground">Business Address</Label>
                          <p className="font-medium">{employee.familyBackground.spouse.businessAddress}</p>
                        </div>

                        <div>
                          <Label className="text-muted-foreground">Telephone Number</Label>
                          <p className="font-medium">{employee.familyBackground.spouse.telephoneNumber}</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No spouse information available</p>
                    )}

                    <h3 className="text-lg font-semibold mt-6 mb-4">Parents Information</h3>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-muted-foreground">Father's Name</Label>
                        <p className="font-medium">
                          {formatEmployeeName(employee.familyBackground.parents.father)}
                        </p>
                      </div>

                      <div>
                        <Label className="text-muted-foreground">Mother's Maiden Name</Label>
                        <p className="font-medium">
                          {formatEmployeeName(employee.familyBackground.parents.mother)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Children</h3>
                    {employee.familyBackground.children && employee.familyBackground.children.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Date of Birth</TableHead>
                            <TableHead>Age</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {employee.familyBackground.children.map((child, index) => (
                            <TableRow key={index}>
                              <TableCell>{child.name}</TableCell>
                              <TableCell>{new Date(child.dateOfBirth).toLocaleDateString()}</TableCell>
                              <TableCell>{calculateAge(child.dateOfBirth)} years</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <p className="text-muted-foreground">No children information available</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Educational Background Tab */}
          <TabsContent value="education" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Educational Background
                </CardTitle>
                <CardDescription>Employee's educational history</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Level</TableHead>
                      <TableHead>School Name</TableHead>
                      <TableHead>Degree/Course</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Year Graduated</TableHead>
                      <TableHead>Honors</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employee.educationalBackground.map((education, index) => (
                      <TableRow key={index}>
                        <TableCell>{education.level}</TableCell>
                        <TableCell>{education.schoolName}</TableCell>
                        <TableCell>{education.degree}</TableCell>
                        <TableCell>
                          {education.periodFrom} - {education.periodTo}
                        </TableCell>
                        <TableCell>{education.yearGraduated}</TableCell>
                        <TableCell>{education.honors || "N/A"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Civil Service Eligibility
                </CardTitle>
                <CardDescription>Employee's civil service qualifications</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Eligibility Type</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Examination Date</TableHead>
                      <TableHead>Examination Place</TableHead>
                      <TableHead>License Number</TableHead>
                      <TableHead>License Release Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employee.civilServiceEligibility.map((eligibility, index) => (
                      <TableRow key={index}>
                        <TableCell>{eligibility.eligibilityType}</TableCell>
                        <TableCell>{eligibility.rating}%</TableCell>
                        <TableCell>{new Date(eligibility.examDate).toLocaleDateString()}</TableCell>
                        <TableCell>{eligibility.examPlace}</TableCell>
                        <TableCell>{eligibility.licenseNumber}</TableCell>
                        <TableCell>{new Date(eligibility.licenseReleaseDate).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Work Experience Tab */}
          <TabsContent value="work" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Work Experience
                </CardTitle>
                <CardDescription>Employee's service record and career history</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Timeline-like Work Experience */}
                <div className="relative border-l-2 border-primary/20 pl-6 ml-6 space-y-10">
                  {employee.workExperience.map((work, index) => {
                    const startDate = new Date(work.periodFrom)
                    const endDate = work.periodTo === "Present" ? new Date() : new Date(work.periodTo)
                    const durationInMonths =
                      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
                      (endDate.getMonth() - startDate.getMonth())
                    const years = Math.floor(durationInMonths / 12)
                    const months = durationInMonths % 12
                    const duration = `${years > 0 ? `${years} year${years > 1 ? "s" : ""}` : ""}${years > 0 && months > 0 ? ", " : ""}${months > 0 ? `${months} month${months > 1 ? "s" : ""}` : ""}`

                    return (
                      <div key={index} className="relative">
                        {/* Timeline dot */}
                        <div className="absolute -left-[34px] top-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                          <div className="h-3 w-3 rounded-full bg-background"></div>
                        </div>

                        {/* Timeline content */}
                        <div className="bg-card rounded-lg border p-4 shadow-sm">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{work.positionTitle}</h3>
                            <Badge variant={work.isGovernmentService ? "default" : "secondary"} className="md:ml-auto">
                              {work.isGovernmentService ? "Government Service" : "Private Sector"}
                            </Badge>
                          </div>

                          <p className="text-muted-foreground mb-2">{work.department}</p>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {new Date(work.periodFrom).toLocaleDateString()} -{" "}
                                {work.periodTo === "Present" ? "Present" : new Date(work.periodTo).toLocaleDateString()}
                              </span>
                            </div>

                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{duration}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Status</p>
                              <p className="font-medium">{work.status}</p>
                            </div>

                            <div>
                              <p className="text-sm text-muted-foreground">Monthly Salary</p>
                              <p className="font-medium">₱{Number.parseInt(work.salary).toLocaleString()}</p>
                            </div>

                            {work.salaryGrade && (
                              <div>
                                <p className="text-sm text-muted-foreground">Salary Grade</p>
                                <p className="font-medium">{work.salaryGrade}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Training Tab */}
          <TabsContent value="training" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Training Programs
                </CardTitle>
                <CardDescription>Training programs and seminars attended</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Hours</TableHead>
                      <TableHead>Conducted/Sponsored By</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employee.training.map((training, index) => (
                      <TableRow key={index}>
                        <TableCell>{training.title}</TableCell>
                        <TableCell>
                          {new Date(training.periodFrom).toLocaleDateString()} -{" "}
                          {new Date(training.periodTo).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{training.hours}</TableCell>
                        <TableCell>{training.sponsor}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Voluntary Work
                </CardTitle>
                <CardDescription>Voluntary work or involvement in civic organizations</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Organization Name</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Hours</TableHead>
                      <TableHead>Position/Nature of Work</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employee.voluntaryWork.map((work, index) => (
                      <TableRow key={index}>
                        <TableCell>{work.organizationName}</TableCell>
                        <TableCell>{work.address}</TableCell>
                        <TableCell>
                          {new Date(work.periodFrom).toLocaleDateString()} -{" "}
                          {new Date(work.periodTo).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{work.hours}</TableCell>
                        <TableCell>{work.position}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other Information Tab */}
          <TabsContent value="other" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Other Information
                </CardTitle>
                <CardDescription>Additional employee information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Special Skills and Hobbies</h3>
                    <div className="flex flex-wrap gap-2">
                      {employee.otherInformation.skills.map((skill, index) => (
                        <Badge key={index} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <h3 className="text-lg font-semibold mt-6 mb-4">Non-Academic Distinctions/Recognitions</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {employee.otherInformation.recognitions.map((recognition, index) => (
                        <li key={index}>{recognition}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Membership in Organizations</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {employee.otherInformation.organizations.map((organization, index) => (
                        <li key={index}>{organization}</li>
                      ))}
                    </ul>

                    <h3 className="text-lg font-semibold mt-6 mb-4">References</h3>
                    <div className="space-y-4">
                      {employee.references.map((reference, index) => (
                        <div key={index} className="border rounded-lg p-3">
                          <p className="font-semibold">{reference.name}</p>
                          <p className="text-sm text-muted-foreground">{reference.address}</p>
                          <p className="text-sm">{reference.telephoneNumber}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attachments Tab */}
          <TabsContent value="attachments" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Document Attachments
                    </CardTitle>
                    <CardDescription>Employee's uploaded documents and files</CardDescription>
                  </div>
                  <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload New Document
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-4">Upload New Document</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="file-upload">Select File</Label>
                        <Input id="file-upload" type="file" className="mt-1" onChange={handleFileChange} />
                      </div>
                      <div>
                        <Label htmlFor="file-category">Category</Label>
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                          <SelectTrigger id="file-category" className="mt-1 w-full">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Personal Information">Personal Information</SelectItem>
                            <SelectItem value="Educational Background">Educational Background</SelectItem>
                            <SelectItem value="Civil Service Eligibility">Civil Service Eligibility</SelectItem>
                            <SelectItem value="Work Experience">Work Experience</SelectItem>
                            <SelectItem value="Training">Training</SelectItem>
                            <SelectItem value="Performance">Performance</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button className="mt-4" onClick={handleUpload} disabled={!newAttachment}>
                      Upload Document
                    </Button>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Uploaded Documents</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Document Name</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Size</TableHead>
                          <TableHead>Upload Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {employee.attachments.map((attachment) => (
                          <TableRow key={attachment.id}>
                            <TableCell>{attachment.name}</TableCell>
                            <TableCell>{attachment.category}</TableCell>
                            <TableCell>{attachment.type}</TableCell>
                            <TableCell>{attachment.size}</TableCell>
                            <TableCell>{new Date(attachment.uploadDate).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-500">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


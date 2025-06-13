import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { salaryGrades } from "@/lib/salary_grades";
import React from "react";

// Define a more specific type for the structure of salaryGrades[year]
type SalaryGradeSteps = { [step: string]: number };
type YearSalaryGrades = { [grade: string]: SalaryGradeSteps };

interface SalaryGradeSectionProps {
  selectedYear: string;
  onSelectYear: (year: string) => void;
  availableYears: string[];
}

export function SalaryGradeSection({ selectedYear, onSelectYear, availableYears }: SalaryGradeSectionProps) {
  const currentYearGrades: YearSalaryGrades = salaryGrades[selectedYear] || {};
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Salary Grade Table</CardTitle>
          <CardDescription>Standardized salary grades and steps</CardDescription>
        </div>
        <Select value={selectedYear} onValueChange={onSelectYear}>
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
              {Object.entries(currentYearGrades).map(([grade, steps]) => (
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
  );
}
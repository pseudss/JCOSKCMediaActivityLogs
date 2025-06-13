"use client"

import { useState } from "react";
import { salaryGrades } from "@/lib/salary_grades";
import { PageHeader } from "@/components/LayoutComponents/page-header";
import { LibraryCategoryNav } from "@/components/LibraryComponents/LibraryCategoryNav";
import { PlantillaSection } from "@/components/LibraryComponents/PlantillaSection";
import { OfficesSection } from "@/components/LibraryComponents/OfficesSection";
import { SalaryGradeSection } from "@/components/LibraryComponents/SalaryGradeSection";

export default function LibraryPage() {
  const [activeCategory, setActiveCategory] = useState("plantilla");
  const [selectedYear, setSelectedYear] = useState("2024");

  const availableYears = Object.keys(salaryGrades).sort().reverse();

  return (
    <div>
      <PageHeader/>
      <div className="flex gap-6">
        <div className="w-1/4">
          <LibraryCategoryNav activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
        </div>
        <div className="w-3/4">
          {activeCategory === "plantilla" && <PlantillaSection />}
          {activeCategory === "offices" && <OfficesSection />}
          {activeCategory === "salary-grades" && (
            <SalaryGradeSection
              selectedYear={selectedYear}
              onSelectYear={setSelectedYear}
              availableYears={availableYears}
            />
          )}
        </div>
      </div>
    </div>
  )
}

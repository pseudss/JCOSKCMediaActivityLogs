"use client"

import { useState } from "react";
import { PageHeader } from "@/components/LayoutComponents/page-header";
import { LibraryCategoryNav } from "@/components/LibraryComponents/LibraryCategoryNav";
import { DeviceSection } from "@/components/LibraryComponents/DeviceSection";
import { MaterialsSection } from "@/components/LibraryComponents/MaterialsSection";
import { DeviceDistinctionSection } from "@/components/LibraryComponents/DeviceDistinctionSection";

export default function LibraryPage() {
  const [activeCategory, setActiveCategory] = useState("device");

  return (
    <div>
      <PageHeader/>
      <div className="flex gap-6">
        <div className="w-1/4">
          <LibraryCategoryNav activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
        </div>
        <div className="w-3/4">
          {activeCategory === "device" && <DeviceSection />}
          {activeCategory === "materials" && <MaterialsSection />}
          {activeCategory === "device-distinction" && <DeviceDistinctionSection />}
        </div>
      </div>
    </div>
  )
}

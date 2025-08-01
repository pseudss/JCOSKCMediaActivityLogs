import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Building, Table2, Users, Monitor, Package, Award } from "lucide-react";
import React from "react";

interface Category {
  key: string;
  label: string;
  icon: React.ElementType;
}

const categories: Category[] = [
  { key: "device", label: "Device", icon: Monitor },
  { key: "device-distinction", label: "Device Distinction", icon: Award },
  { key: "materials", label: "Materials", icon: Package },
];

interface LibraryCategoryNavProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export function LibraryCategoryNav({ activeCategory, onSelectCategory }: LibraryCategoryNavProps) {
  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Categories</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col w-full">
          {categories.map((category) => (
            <button
              key={category.key}
              className={`flex items-center gap-2 px-4 py-3 w-full text-left hover:bg-muted transition-colors ${
                activeCategory === category.key ? "bg-muted text-primary" : ""
              }`}
              onClick={() => onSelectCategory(category.key)}
            >
              <category.icon className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{category.label}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
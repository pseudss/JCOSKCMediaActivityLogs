import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCog, Key } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryDefinition {
  key: string;
  label: string;
  icon: React.ElementType;
}

const categories: CategoryDefinition[] = [
  { key: "users", label: "Users", icon: Users },
  { key: "roles", label: "Roles", icon: UserCog },
  { key: "permissions", label: "Permissions", icon: Key },
];

interface AccessCategoryNavProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export function AccessCategoryNav({ activeCategory, onSelectCategory }: AccessCategoryNavProps) {
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
              className={cn(
                "flex items-center gap-2 px-4 py-3 w-full text-left hover:bg-muted transition-colors",
                activeCategory === category.key ? "bg-muted text-primary" : ""
              )}
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
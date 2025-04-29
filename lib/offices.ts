export interface Office {
    id: string
    name: string
    code: string
    description: string
    head: string
    location: string
  }
  
  export const offices: Office[] = [
    {
      id: "O001",
      name: "Information Technology Department",
      code: "ITD",
      description: "Responsible for managing the organization's technology infrastructure",
      head: "John Smith",
      location: "5th Floor, Main Building",
    },
    {
      id: "O002",
      name: "Human Resources Department",
      code: "HRD",
      description: "Manages employee relations, recruitment, and personnel development",
      head: "Maria Santos",
      location: "3rd Floor, Main Building",
    },
    {
      id: "O003",
      name: "Finance Department",
      code: "FIN",
      description: "Handles financial planning, accounting, and budget management",
      head: "Robert Johnson",
      location: "4th Floor, Main Building",
    },
  ]
  
  
export interface PlantillaPosition {
    id: string
    title: string
    department: string
    salary_grade: string
    status: string
    count: number
  }
  
  export const positions: PlantillaPosition[] = [
    { id: "P001", title: "Software Engineer", department: "IT", salary_grade: "SG-15", status: "Filled", count: 5 },
    {
      id: "P002",
      title: "HR Manager",
      department: "Human Resources",
      salary_grade: "SG-18",
      status: "Filled",
      count: 1,
    },
    { id: "P003", title: "Accountant", department: "Finance", salary_grade: "SG-15", status: "Filled", count: 3 },
    {
      id: "P004",
      title: "Marketing Specialist",
      department: "Marketing",
      salary_grade: "SG-14",
      status: "Vacant",
      count: 2,
    },
    { id: "P005", title: "Project Manager", department: "IT", salary_grade: "SG-17", status: "Filled", count: 2 },
  ]
  
  
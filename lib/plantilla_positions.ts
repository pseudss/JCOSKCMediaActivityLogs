export interface PlantillaPosition {
    id: string
    title: string
    salaryGrade: string
    monthlySalary: string
    education: string
    experience: string
    training: string
    eligibility: string
    duties: string[]
  }
  
  export const plantillaPositions: PlantillaPosition[] = [
    {
      id: "P001",
      title: "Information Technology Officer II",
      salaryGrade: "19",
      monthlySalary: "₱54,385",
      education: "Bachelor's Degree relevant to the job",
      experience: "2 years of relevant experience",
      training: "8 hours of relevant training",
      eligibility: "Career Service Professional (2nd Level Eligibility)",
      duties: [
        "Develops and maintains IT systems",
        "Manages network security and database administration",
        "Provides IT support and troubleshooting",
        "Implements cybersecurity measures",
      ],
    },
    {
      id: "P002",
      title: "Administrative Officer V (HRMO III)",
      salaryGrade: "18",
      monthlySalary: "₱46,725",
      education: "Bachelor's Degree relevant to the job",
      experience: "2 years of relevant experience",
      training: "8 hours of relevant training",
      eligibility: "Career Service Professional (2nd Level Eligibility)",
      duties: [
        "Oversees human resource management functions",
        "Manages recruitment, employee benefits, and training programs",
        "Ensures compliance with CSC and DBM rules",
        "Prepares HR-related reports and documents",
      ],
    },
    {
      id: "P003",
      title: "Accountant III",
      salaryGrade: "19",
      monthlySalary: "₱54,385",
      education: "Bachelor's Degree in Accountancy",
      experience: "2 years of relevant experience",
      training: "8 hours of relevant training",
      eligibility: "RA 1080 (Certified Public Accountant)",
      duties: [
        "Prepares and analyzes financial statements",
        "Ensures compliance with accounting and auditing standards",
        "Reviews disbursement vouchers and payroll",
        "Assists in budget preparation and financial planning",
      ],
    },
  ]
  
  
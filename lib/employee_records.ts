// Types for employee data
export interface Address {
    houseNumber: string
    street: string
    subdivision?: string
    barangay: string
    city: string
    province: string
    zipCode: string
  }
  
  export interface PersonalInfo {
    firstName: string
    middleName?: string
    lastName: string
    nameExtension?: string
    dateOfBirth: string
    placeOfBirth: string
    sex: string
    civilStatus: string
    height: string
    weight: string
    bloodType: string
    gsisId: string
    pagIbigId: string
    philHealthNumber: string
    sssNumber: string
    tin: string
    agencyEmployeeNumber: string
    citizenship: string
    email: string
    mobileNumber: string
    telephoneNumber?: string
    address: {
      residential: Address
      permanent: Address
    }
  }
  
  export interface Spouse {
    lastName: string
    firstName: string
    middleName?: string
    nameExtension?: string
    occupation: string
    employerName: string
    businessAddress: string
    telephoneNumber: string
  }
  
  export interface Child {
    name: string
    dateOfBirth: string
  }
  
  export interface Parent {
    lastName: string
    firstName: string
    middleName?: string
    nameExtension?: string
  }
  
  export interface FamilyBackground {
    spouse?: Spouse
    children: Child[]
    parents: {
      father: Parent
      mother: Parent
    }
  }
  
  export interface Education {
    level: string
    schoolName: string
    degree: string
    periodFrom: string
    periodTo: string
    yearGraduated: string
    honors?: string
  }
  
  export interface CivilServiceEligibility {
    eligibilityType: string
    rating: string
    examDate: string
    examPlace: string
    licenseNumber: string
    licenseReleaseDate: string
  }
  
  export interface WorkExperience {
    positionTitle: string
    department: string
    status: string
    salary: string
    salaryGrade?: string
    periodFrom: string
    periodTo: string
    isGovernmentService: boolean
  }
  
  export interface VoluntaryWork {
    organizationName: string
    address: string
    periodFrom: string
    periodTo: string
    hours: number
    position: string
  }
  
  export interface Training {
    title: string
    periodFrom: string
    periodTo: string
    hours: number
    sponsor: string
  }
  
  export interface OtherInformation {
    skills: string[]
    recognitions: string[]
    organizations: string[]
  }
  
  export interface Reference {
    name: string
    address: string
    telephoneNumber: string
  }
  
  export interface Attachment {
    id: number
    name: string
    type: string
    size: string
    uploadDate: string
    category: string
  }
  
  export interface Employee {
    id: string
    personalInfo: PersonalInfo
    familyBackground: FamilyBackground
    educationalBackground: Education[]
    civilServiceEligibility: CivilServiceEligibility[]
    workExperience: WorkExperience[]
    voluntaryWork: VoluntaryWork[]
    training: Training[]
    otherInformation: OtherInformation
    references: Reference[]
    attachments: Attachment[]
  }
  
  // Sample employee records
  export const employees: Employee[] = [
    {
      id: "1",
      personalInfo: {
        firstName: "John",
        middleName: "Robert",
        lastName: "Doe",
        nameExtension: "",
        dateOfBirth: "1985-06-15",
        placeOfBirth: "Manila City",
        sex: "Male",
        civilStatus: "Married",
        height: "1.75",
        weight: "70",
        bloodType: "O+",
        gsisId: "1234567890",
        pagIbigId: "2345678901",
        philHealthNumber: "3456789012",
        sssNumber: "4567890123",
        tin: "5678901234",
        agencyEmployeeNumber: "EMP-2023-001",
        citizenship: "Filipino",
        email: "john.doe@example.com",
        mobileNumber: "+63 912 345 6789",
        telephoneNumber: "(02) 8123 4567",
        address: {
          residential: {
            houseNumber: "123",
            street: "Main Street",
            subdivision: "Green Valley",
            barangay: "San Antonio",
            city: "Makati City",
            province: "Metro Manila",
            zipCode: "1200",
          },
          permanent: {
            houseNumber: "123",
            street: "Main Street",
            subdivision: "Green Valley",
            barangay: "San Antonio",
            city: "Makati City",
            province: "Metro Manila",
            zipCode: "1200",
          },
        },
      },
      familyBackground: {
        spouse: {
          lastName: "Doe",
          firstName: "Jane",
          middleName: "Marie",
          nameExtension: "",
          occupation: "Teacher",
          employerName: "Public School District",
          businessAddress: "456 Education Ave, Makati City",
          telephoneNumber: "(02) 8765 4321",
        },
        children: [
          {
            name: "James Doe",
            dateOfBirth: "2010-03-20",
          },
          {
            name: "Jessica Doe",
            dateOfBirth: "2012-07-10",
          },
        ],
        parents: {
          father: {
            lastName: "Doe",
            firstName: "Robert",
            middleName: "James",
            nameExtension: "Sr.",
          },
          mother: {
            lastName: "Smith",
            firstName: "Mary",
            middleName: "Anne",
          },
        },
      },
      educationalBackground: [
        {
          level: "Elementary",
          schoolName: "Central Elementary School",
          degree: "Elementary Education",
          periodFrom: "1991",
          periodTo: "1997",
          yearGraduated: "1997",
          honors: "Valedictorian",
        },
        {
          level: "Secondary",
          schoolName: "National High School",
          degree: "Secondary Education",
          periodFrom: "1997",
          periodTo: "2001",
          yearGraduated: "2001",
          honors: "With Honors",
        },
        {
          level: "Tertiary",
          schoolName: "State University",
          degree: "Bachelor of Science in Computer Science",
          periodFrom: "2001",
          periodTo: "2005",
          yearGraduated: "2005",
          honors: "Cum Laude",
        },
        {
          level: "Graduate",
          schoolName: "National University",
          degree: "Master of Business Administration",
          periodFrom: "2010",
          periodTo: "2012",
          yearGraduated: "2012",
          honors: "",
        },
      ],
      civilServiceEligibility: [
        {
          eligibilityType: "Civil Service Professional",
          rating: "85.23",
          examDate: "2006-06-11",
          examPlace: "Manila",
          licenseNumber: "CSP-123456",
          licenseReleaseDate: "2006-07-15",
        },
        {
          eligibilityType: "Career Service Executive",
          rating: "89.75",
          examDate: "2015-03-22",
          examPlace: "Manila",
          licenseNumber: "CSE-789012",
          licenseReleaseDate: "2015-04-30",
        },
      ],
      workExperience: [
        {
          positionTitle: "IT Specialist I",
          department: "Department of Information and Communications Technology",
          status: "Permanent",
          salary: "25000",
          salaryGrade: "SG-15-1",
          periodFrom: "2005-08-01",
          periodTo: "2008-07-31",
          isGovernmentService: true,
        },
        {
          positionTitle: "IT Specialist II",
          department: "Department of Information and Communications Technology",
          status: "Permanent",
          salary: "30000",
          salaryGrade: "SG-16-1",
          periodFrom: "2008-08-01",
          periodTo: "2011-07-31",
          isGovernmentService: true,
        },
        {
          positionTitle: "Senior Systems Analyst",
          department: "ABC Corporation",
          status: "Regular",
          salary: "45000",
          salaryGrade: "",
          periodFrom: "2011-08-01",
          periodTo: "2015-12-31",
          isGovernmentService: false,
        },
        {
          positionTitle: "IT Manager",
          department: "Department of Information and Communications Technology",
          status: "Permanent",
          salary: "60000",
          salaryGrade: "SG-22-1",
          periodFrom: "2016-01-01",
          periodTo: "Present",
          isGovernmentService: true,
        },
      ],
      voluntaryWork: [
        {
          organizationName: "Community Volunteers Association",
          address: "789 Volunteer St., Quezon City",
          periodFrom: "2010-01-01",
          periodTo: "2010-12-31",
          hours: 120,
          position: "IT Volunteer",
        },
        {
          organizationName: "Disaster Relief Organization",
          address: "456 Help Ave., Makati City",
          periodFrom: "2013-06-01",
          periodTo: "2013-12-31",
          hours: 80,
          position: "Relief Operations Volunteer",
        },
      ],
      training: [
        {
          title: "Project Management Professional",
          periodFrom: "2009-03-15",
          periodTo: "2009-03-19",
          hours: 40,
          sponsor: "Project Management Institute",
        },
        {
          title: "Leadership and Management Training",
          periodFrom: "2012-07-10",
          periodTo: "2012-07-14",
          hours: 40,
          sponsor: "Civil Service Commission",
        },
        {
          title: "Information Security Management",
          periodFrom: "2014-11-03",
          periodTo: "2014-11-07",
          hours: 40,
          sponsor: "DICT Academy",
        },
        {
          title: "Strategic Planning Workshop",
          periodFrom: "2017-02-20",
          periodTo: "2017-02-24",
          hours: 40,
          sponsor: "Civil Service Commission",
        },
        {
          title: "Digital Transformation in Government",
          periodFrom: "2019-09-16",
          periodTo: "2019-09-20",
          hours: 40,
          sponsor: "DICT Academy",
        },
      ],
      otherInformation: {
        skills: ["Programming", "Project Management", "Public Speaking", "Data Analysis"],
        recognitions: ["Employee of the Year 2018", "Special Citation for Innovation 2020"],
        organizations: ["IT Professionals Association", "Government Employees Association"],
      },
      references: [
        {
          name: "Dr. Maria Santos",
          address: "State University, Manila",
          telephoneNumber: "(02) 8123 9876",
        },
        {
          name: "Engr. Robert Cruz",
          address: "Department of Public Works and Highways, Quezon City",
          telephoneNumber: "(02) 8456 7890",
        },
        {
          name: "Atty. James Reyes",
          address: "Legal Department, Makati City",
          telephoneNumber: "(02) 8789 0123",
        },
      ],
      attachments: [
        {
          id: 1,
          name: "Personal Data Sheet.pdf",
          type: "PDF",
          size: "2.4 MB",
          uploadDate: "2023-01-15",
          category: "Personal Information",
        },
        {
          id: 2,
          name: "Diploma - Bachelor's Degree.pdf",
          type: "PDF",
          size: "1.8 MB",
          uploadDate: "2023-01-15",
          category: "Educational Background",
        },
        {
          id: 3,
          name: "Civil Service Eligibility Certificate.pdf",
          type: "PDF",
          size: "1.2 MB",
          uploadDate: "2023-01-15",
          category: "Civil Service Eligibility",
        },
        {
          id: 4,
          name: "Training Certificate - Project Management.pdf",
          type: "PDF",
          size: "0.9 MB",
          uploadDate: "2023-01-15",
          category: "Training",
        },
        {
          id: 5,
          name: "Performance Evaluation 2022.pdf",
          type: "PDF",
          size: "1.5 MB",
          uploadDate: "2023-02-28",
          category: "Performance",
        },
      ],
    },
    {
      id: "2",
      personalInfo: {
        firstName: "Maria",
        middleName: "Elena",
        lastName: "Santos",
        nameExtension: "",
        dateOfBirth: "1988-09-23",
        placeOfBirth: "Quezon City",
        sex: "Female",
        civilStatus: "Single",
        height: "1.65",
        weight: "55",
        bloodType: "A+",
        gsisId: "9876543210",
        pagIbigId: "8765432109",
        philHealthNumber: "7654321098",
        sssNumber: "6543210987",
        tin: "5432109876",
        agencyEmployeeNumber: "EMP-2023-002",
        citizenship: "Filipino",
        email: "maria.santos@example.com",
        mobileNumber: "+63 917 654 3210",
        telephoneNumber: "(02) 8987 6543",
        address: {
          residential: {
            houseNumber: "456",
            street: "Maple Avenue",
            subdivision: "Blue Heights",
            barangay: "San Lorenzo",
            city: "Quezon City",
            province: "Metro Manila",
            zipCode: "1100",
          },
          permanent: {
            houseNumber: "456",
            street: "Maple Avenue",
            subdivision: "Blue Heights",
            barangay: "San Lorenzo",
            city: "Quezon City",
            province: "Metro Manila",
            zipCode: "1100",
          },
        },
      },
      familyBackground: {
        children: [],
        parents: {
          father: {
            lastName: "Santos",
            firstName: "Miguel",
            middleName: "Garcia",
            nameExtension: "",
          },
          mother: {
            lastName: "Reyes",
            firstName: "Elena",
            middleName: "Cruz",
          },
        },
      },
      educationalBackground: [
        {
          level: "Elementary",
          schoolName: "St. Mary's Elementary School",
          degree: "Elementary Education",
          periodFrom: "1994",
          periodTo: "2000",
          yearGraduated: "2000",
          honors: "With High Honors",
        },
        {
          level: "Secondary",
          schoolName: "St. Paul College",
          degree: "Secondary Education",
          periodFrom: "2000",
          periodTo: "2004",
          yearGraduated: "2004",
          honors: "With High Honors",
        },
        {
          level: "Tertiary",
          schoolName: "University of the Philippines",
          degree: "Bachelor of Science in Accountancy",
          periodFrom: "2004",
          periodTo: "2008",
          yearGraduated: "2008",
          honors: "Magna Cum Laude",
        },
        {
          level: "Graduate",
          schoolName: "Asian Institute of Management",
          degree: "Master of Business Administration",
          periodFrom: "2012",
          periodTo: "2014",
          yearGraduated: "2014",
          honors: "With Distinction",
        },
      ],
      civilServiceEligibility: [
        {
          eligibilityType: "Certified Public Accountant",
          rating: "92.45",
          examDate: "2008-10-05",
          examPlace: "Manila",
          licenseNumber: "CPA-987654",
          licenseReleaseDate: "2008-11-15",
        },
        {
          eligibilityType: "Civil Service Professional",
          rating: "88.90",
          examDate: "2009-06-14",
          examPlace: "Manila",
          licenseNumber: "CSP-654321",
          licenseReleaseDate: "2009-07-30",
        },
      ],
      workExperience: [
        {
          positionTitle: "Accountant I",
          department: "Department of Finance",
          status: "Permanent",
          salary: "28000",
          salaryGrade: "SG-16-1",
          periodFrom: "2008-12-01",
          periodTo: "2011-11-30",
          isGovernmentService: true,
        },
        {
          positionTitle: "Senior Accountant",
          department: "XYZ Corporation",
          status: "Regular",
          salary: "42000",
          salaryGrade: "",
          periodFrom: "2011-12-01",
          periodTo: "2015-05-31",
          isGovernmentService: false,
        },
        {
          positionTitle: "Accountant III",
          department: "Department of Finance",
          status: "Permanent",
          salary: "45000",
          salaryGrade: "SG-18-1",
          periodFrom: "2015-06-01",
          periodTo: "2018-05-31",
          isGovernmentService: true,
        },
        {
          positionTitle: "Finance Manager",
          department: "Department of Finance",
          status: "Permanent",
          salary: "65000",
          salaryGrade: "SG-24-1",
          periodFrom: "2018-06-01",
          periodTo: "Present",
          isGovernmentService: true,
        },
      ],
      voluntaryWork: [
        {
          organizationName: "Financial Literacy for Youth",
          address: "123 Education St., Makati City",
          periodFrom: "2010-06-01",
          periodTo: "2010-12-31",
          hours: 100,
          position: "Financial Literacy Trainer",
        },
        {
          organizationName: "Tax Help Desk",
          address: "789 Community Ave., Quezon City",
          periodFrom: "2016-01-01",
          periodTo: "2016-04-15",
          hours: 60,
          position: "Tax Consultant Volunteer",
        },
      ],
      training: [
        {
          title: "International Financial Reporting Standards Update",
          periodFrom: "2010-02-15",
          periodTo: "2010-02-19",
          hours: 40,
          sponsor: "Association of Certified Public Accountants",
        },
        {
          title: "Government Accounting and Auditing",
          periodFrom: "2013-05-06",
          periodTo: "2013-05-10",
          hours: 40,
          sponsor: "Commission on Audit",
        },
        {
          title: "Strategic Financial Management",
          periodFrom: "2016-08-22",
          periodTo: "2016-08-26",
          hours: 40,
          sponsor: "Department of Finance",
        },
        {
          title: "Leadership for Finance Executives",
          periodFrom: "2019-03-11",
          periodTo: "2019-03-15",
          hours: 40,
          sponsor: "Civil Service Commission",
        },
        {
          title: "Digital Transformation in Finance",
          periodFrom: "2021-07-19",
          periodTo: "2021-07-23",
          hours: 40,
          sponsor: "Department of Information and Communications Technology",
        },
      ],
      otherInformation: {
        skills: ["Financial Analysis", "Budgeting", "Tax Planning", "Financial Reporting", "Audit Management"],
        recognitions: ["Outstanding Government Accountant 2019", "Finance Innovation Award 2021"],
        organizations: [
          "Philippine Institute of Certified Public Accountants",
          "Government Finance Officers Association",
        ],
      },
      references: [
        {
          name: "Dr. Antonio Reyes",
          address: "University of the Philippines, Quezon City",
          telephoneNumber: "(02) 8123 4567",
        },
        {
          name: "Ms. Sophia Lim",
          address: "Department of Finance, Manila",
          telephoneNumber: "(02) 8765 4321",
        },
        {
          name: "Mr. David Garcia",
          address: "XYZ Corporation, Makati City",
          telephoneNumber: "(02) 8987 6543",
        },
      ],
      attachments: [
        {
          id: 1,
          name: "Personal Data Sheet.pdf",
          type: "PDF",
          size: "2.2 MB",
          uploadDate: "2023-01-20",
          category: "Personal Information",
        },
        {
          id: 2,
          name: "CPA License.pdf",
          type: "PDF",
          size: "1.5 MB",
          uploadDate: "2023-01-20",
          category: "Civil Service Eligibility",
        },
        {
          id: 3,
          name: "MBA Diploma.pdf",
          type: "PDF",
          size: "1.7 MB",
          uploadDate: "2023-01-20",
          category: "Educational Background",
        },
        {
          id: 4,
          name: "Financial Management Certificate.pdf",
          type: "PDF",
          size: "1.1 MB",
          uploadDate: "2023-01-20",
          category: "Training",
        },
        {
          id: 5,
          name: "Performance Evaluation 2022.pdf",
          type: "PDF",
          size: "1.4 MB",
          uploadDate: "2023-03-05",
          category: "Performance",
        },
      ],
    },
  ]
  
  // Helper function to get employee by ID
  export function getEmployeeById(id: string): Employee | undefined {
    return employees.find((employee) => employee.id === id)
  }
  
  // Helper function to get employee summary (for list views)
  export interface EmployeeSummary {
    id: string
    name: string
    position: string
    department: string
    email: string
    mobileNumber: string
    status: string
  }
  
  export function getEmployeeSummaries(): EmployeeSummary[] {
    return employees.map((employee) => {
      const currentPosition = employee.workExperience[employee.workExperience.length - 1]
      return {
        id: employee.id,
        name: `${employee.personalInfo.firstName} ${employee.personalInfo.middleName ? employee.personalInfo.middleName.charAt(0) + ". " : ""}${employee.personalInfo.lastName} ${employee.personalInfo.nameExtension || ""}`,
        position: currentPosition.positionTitle,
        department: currentPosition.department,
        email: employee.personalInfo.email,
        mobileNumber: employee.personalInfo.mobileNumber,
        status: currentPosition.status,
      }
    })
  }
  
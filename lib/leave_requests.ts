export interface LeaveRequest {
    id: number
    employee: string
    type: string
    start_date: string
    end_date: string
    status: string
  }
  
  export interface LeaveBalance {
    employee: string
    vacationLeave: string
    sickLeave: string
    personalLeave: string
    totalAvailable: string
  }
  
  export const leaveRequests: LeaveRequest[] = [
    {
      id: 1,
      employee: "John Doe",
      type: "Vacation Leave",
      start_date: "2023-03-15",
      end_date: "2023-03-20",
      status: "Pending",
    },
    {
      id: 2,
      employee: "Jane Smith",
      type: "Sick Leave",
      start_date: "2023-03-10",
      end_date: "2023-03-12",
      status: "Approved",
    },
    {
      id: 3,
      employee: "Robert Johnson",
      type: "Personal Leave",
      start_date: "2023-03-25",
      end_date: "2023-03-26",
      status: "Pending",
    },
    {
      id: 4,
      employee: "Emily Davis",
      type: "Maternity Leave",
      start_date: "2023-04-01",
      end_date: "2023-07-01",
      status: "Approved",
    },
    {
      id: 5,
      employee: "Michael Wilson",
      type: "Vacation Leave",
      start_date: "2023-03-22",
      end_date: "2023-03-24",
      status: "Rejected",
    },
  ]
  
  export const leaveBalances: LeaveBalance[] = [
    {
      employee: "John Doe",
      vacationLeave: "10 days",
      sickLeave: "15 days",
      personalLeave: "3 days",
      totalAvailable: "28 days",
    },
    {
      employee: "Jane Smith",
      vacationLeave: "8 days",
      sickLeave: "12 days",
      personalLeave: "2 days",
      totalAvailable: "22 days",
    },
    {
      employee: "Robert Johnson",
      vacationLeave: "12 days",
      sickLeave: "15 days",
      personalLeave: "3 days",
      totalAvailable: "30 days",
    },
    {
      employee: "Emily Davis",
      vacationLeave: "0 days",
      sickLeave: "5 days",
      personalLeave: "1 day",
      totalAvailable: "6 days",
    },
  ]
  
  
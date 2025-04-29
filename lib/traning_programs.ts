export interface TrainingProgram {
    id: number
    title: string
    type: string
    start_date: string
    end_date: string
    status: string
    participants: number
  }
  
  export interface TrainingAnalytic {
    title: string
    value: string
    description: string
  }
  
  export const trainings: TrainingProgram[] = [
    {
      id: 1,
      title: "Leadership Development",
      type: "Internal",
      start_date: "2023-03-15",
      end_date: "2023-03-17",
      status: "Upcoming",
      participants: 15,
    },
    {
      id: 2,
      title: "Technical Skills Workshop",
      type: "External",
      start_date: "2023-02-10",
      end_date: "2023-02-12",
      status: "Completed",
      participants: 25,
    },
    {
      id: 3,
      title: "Customer Service Excellence",
      type: "Internal",
      start_date: "2023-04-05",
      end_date: "2023-04-06",
      status: "Upcoming",
      participants: 30,
    },
    {
      id: 4,
      title: "Project Management Certification",
      type: "External",
      start_date: "2023-01-20",
      end_date: "2023-01-25",
      status: "Completed",
      participants: 10,
    },
    {
      id: 5,
      title: "Workplace Safety Training",
      type: "Internal",
      start_date: "2023-03-28",
      end_date: "2023-03-29",
      status: "Upcoming",
      participants: 45,
    },
  ]
  
  export const trainingAnalytics: TrainingAnalytic[] = [
    {
      title: "Participation Rate",
      value: "87%",
      description: "Average attendance rate",
    },
    {
      title: "Completion Rate",
      value: "92%",
      description: "Program completion rate",
    },
    {
      title: "Satisfaction Score",
      value: "4.7/5",
      description: "Average participant rating",
    },
  ]
  
  
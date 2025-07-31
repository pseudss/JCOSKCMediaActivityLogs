import { PrismaClient } from './generated'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding offices...')

  const offices = [
    {
      name: "Information Technology Department",
      code: "ITD",
      description: "Responsible for managing the organization's technology infrastructure",
      head: "John Smith",
      location: "5th Floor, Main Building",
    },
    {
      name: "Human Resources Department",
      code: "HRD",
      description: "Manages employee relations, recruitment, and personnel development",
      head: "Maria Santos",
      location: "3rd Floor, Main Building",
    },
    {
      name: "Finance Department",
      code: "FIN",
      description: "Handles financial planning, accounting, and budget management",
      head: "Robert Johnson",
      location: "4th Floor, Main Building",
    },
  ]

  for (const office of offices) {
    await prisma.office.upsert({
      where: { code: office.code },
      update: {},
      create: office,
    })
  }

  console.log('Offices seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 
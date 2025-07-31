import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { MemberPageClient } from "@/components/MemberComponents/MemberPageClient";
import { prisma } from "@/lib/prisma";

export default async function MemberPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  // Fetch only active members from the database with office data
  const members = await prisma.member.findMany({
    where: {
      active: true
    },
    include: {
      office: true
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  return (
    <MemberPageClient
      initialMembers={
        members.map((m) => ({
          id: m.id,
          name: m.name,
          description: m.description ?? "",
          active: m.active,
          createdAt: m.createdAt,
          officeId: m.officeId ?? undefined,
          office: m.office ? {
            id: m.office.id,
            name: m.office.name,
            code: m.office.code,
            description: m.office.description ?? undefined,
            head: m.office.head ?? undefined,
            location: m.office.location ?? undefined,
          } : undefined,
        }))
      }
    />
  );
}
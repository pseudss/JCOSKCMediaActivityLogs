import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/LayoutComponents/page-header";
import { MemberActivityLogsClient } from "@/components/MemberActivityLogsComponents/MemberActivityLogsClient";
import { prisma } from "@/lib/prisma";

export default async function MemberActivityLogsPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  // Fetch initial data
  const activityLogs = await prisma.memberActivityLog.findMany({
    where: {
      active: true
    },
    include: {
      member: true,
      // Remove this line: device: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const members = await prisma.member.findMany({
    where: {
      active: true
    },
    orderBy: {
      name: 'asc'
    }
  });

  const devices = await prisma.device.findMany({
    where: {
      active: true
    },
    orderBy: {
      name: 'asc'
    }
  });

  return (
    <div>
      <PageHeader />
      <MemberActivityLogsClient 
        initialActivityLogs={activityLogs}
        initialMembers={members}
        initialDevices={devices}
      />
    </div>
  );
} 
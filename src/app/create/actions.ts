"use server";

import { prisma } from "../../../prisma/prismaSingleton";

// nextjs server actions
export async function saveDashboard(formData: FormData) {
  const dashboardname = formData.get("dashboardName")?.toString() ?? "default";
  await prisma.dashboard.create({
    data: {
      name: dashboardname,
      userId: 1,
    },
  });
}

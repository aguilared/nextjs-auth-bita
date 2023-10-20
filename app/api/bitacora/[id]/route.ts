import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: any) {
  console.log("PArams", context.params);

  const bitacoraId = Number(context.params.id);
  console.log("ID", bitacoraId);
  const result = await prisma.bitacora.findUnique({
    where: {
      id: Number(bitacoraId),
    },
    include: {
      author: {
        select: { name: true },
      },
      _count: {
        select: { bita_events: true },
      },
    },
  });

  return NextResponse.json(result);
}

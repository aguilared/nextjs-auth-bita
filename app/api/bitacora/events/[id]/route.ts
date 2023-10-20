import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: any) {
  console.log("PArams", context.params);

  const bitacoraId = Number(context.params.id);
  console.log("ID", bitacoraId);
  const [result] = await prisma.$transaction([
    prisma.bitaEvents.findMany({
      where: { bitacora_id: Number(bitacoraId) },
      orderBy: { id: "asc" },
      include: {
        event: {
          select: { id: true, description: true },
        },
        tipoEvent: {
          select: { id: true, description: true },
        },
      },
    }),
  ]);

  return NextResponse.json(result);
}

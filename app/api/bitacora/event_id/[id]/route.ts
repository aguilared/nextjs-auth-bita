import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: any) {
  console.log("PArams", context.params);

  const bitacoraId = Number(context.params.id);
  console.log("ID", bitacoraId);
  const [result] = await prisma.$transaction([
    prisma.bitaEvents.findUnique({
      where: { id: Number(bitacoraId) },
      include: {
        event: {
          select: { id: true, description: true },
        },
        tipoEvent: {
          select: { id: true, description: true },
        },
        bitacora: {
          select: { id: true, author: true },
        },
      },
    }),
  ]);

  return NextResponse.json(result);
}

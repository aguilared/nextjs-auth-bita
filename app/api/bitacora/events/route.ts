import prisma from "@/lib/prisma";

export async function GET(request: Request, response: Response) {
  const result = await prisma.bitaEvents.findMany({
    orderBy: {
      bitacora_id: "desc",
    },
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
    take: 15,
  });
  return Response.json(result);
}

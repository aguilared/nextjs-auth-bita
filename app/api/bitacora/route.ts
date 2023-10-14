import prisma from "@/lib/prisma";

export async function GET(request: Request, response: Response) {
  const result = await prisma.bitacora.findMany({
    orderBy: {
      bitacora_date: "desc",
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
  return Response.json(result);
}

import prisma from "@/lib/prisma";

export default async function handle1(request: Request, response: Response) {
  const bitacoraId = Request.query.id;
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

  Response.json(result);
}

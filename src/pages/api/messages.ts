import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prismaClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { contactId } = req.query;
  const where = contactId ? { contactId: Number(contactId) } : {};
  const messages = await prisma.message.findMany({
    where,
    include: { contact: true },
    orderBy: { createdAt: "desc" },
  });
  res.status(200).json(messages);
}

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prismaClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const templates = await prisma.template.findMany({ orderBy: { createdAt: "desc" } });
    res.status(200).json(templates);
  } else if (req.method === "POST") {
    const { name, content } = req.body;
    const template = await prisma.template.create({ data: { name, content } });
    res.status(201).json(template);
  } else {
    res.status(405).end();
  }
}

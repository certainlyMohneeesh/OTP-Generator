import type { NextApiRequest, NextApiResponse } from "next";
import { getContacts, getContactById, exportContacts } from "@/lib/contacts";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const { id, page, perPage } = req.query;
      
      if (id) {
        const contact = await getContactById(Number(id));
        return res.status(200).json(contact);
      }
      
      if (req.query.export === 'true') {
        const contacts = await exportContacts();
        return res.status(200).json(contacts);
      }
      
      const contacts = await getContacts(
        page ? Number(page) : 1,
        perPage ? Number(perPage) : 10
      );
      return res.status(200).json(contacts);
    }
    
    res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

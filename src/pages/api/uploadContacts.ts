import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import { importContacts } from "@/lib/contacts";
import { parse } from "csv-parse";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({ error: "Error parsing the file" });
      }
      const file = Array.isArray(files.file) ? files.file[0] : files.file;
      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const contacts: any[] = [];
      fs.createReadStream(file.filepath as string)
        .pipe(parse({ columns: true }))
        .on("data", (data) => contacts.push(data))
        .on("end", async () => {
          await importContacts(contacts);
          return res.status(200).json({ message: "Contacts imported" });
        });
    });  } else {
    res.status(405).end();
  }
}

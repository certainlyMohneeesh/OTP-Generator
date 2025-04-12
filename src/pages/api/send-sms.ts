import type { NextApiRequest, NextApiResponse } from "next";
import { sendSMS } from "@/lib/sms";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { to, content, otp, contactId, expiresAt } = req.body;
    
    const message = await sendSMS({
      to,
      content,
      otp,
      contactId: Number(contactId),
      expiresAt: new Date(expiresAt),
    });
    
    res.status(200).json(message);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to send SMS" });
  }
}

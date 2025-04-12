import axios from "axios";
import prisma from "../prismaClient";
import { MessageStatus } from "@prisma/client";

const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW || "60000", 10);
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || "5", 10);

let smsCount = 0;
let windowStart = Date.now();

const resetRateLimit = () => {
  const now = Date.now();
  if (now - windowStart > RATE_LIMIT_WINDOW) {
    windowStart = now;
    smsCount = 0;
  }
};

export const sendSMS = async ({
  to,
  content,
  otp,
  contactId,
  expiresAt,
}: {
  to: string;
  content: string;
  otp: string;
  contactId: number;
  expiresAt: Date;
}) => {
  resetRateLimit();
  if (smsCount >= RATE_LIMIT_MAX) {
    throw new Error("Rate limit exceeded. Please try again later.");
  }

  smsCount++;
  
  // Create message record in DB with status pending.
  const message = await prisma.message.create({
    data: {
      content,
      otp,
      status: MessageStatus.PENDING,
      expiresAt,
      contact: { connect: { id: contactId } },
    },
  });

  try {
    // Simulate SMS sending with a fake API call.
    // Replace with Twilio/Vonage API call as needed.
    await axios.post("https://api.fake-sms-service.com/send", {
      to,
      message: content,
    });
    // Update status to SENT.
    await prisma.message.update({
      where: { id: message.id },
      data: { status: MessageStatus.SENT },
    });
    return message;
  } catch (error) {
    // Update status to FAILED.
    await prisma.message.update({
      where: { id: message.id },
      data: { status: MessageStatus.FAILED },
    });
    throw error;
  }
};

// Function to simulate checking delivery receipt (could be triggered by a webhook)
export const updateSMSStatus = async (messageId: number, status: MessageStatus) => {
  return prisma.message.update({
    where: { id: messageId },
    data: { status },
  });
};

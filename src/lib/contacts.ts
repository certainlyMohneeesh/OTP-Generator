import fs from "fs";
import path from "path";
import { Contact } from "@prisma/client";
import prisma from "../prismaClient"; // our Prisma client instance

export const getContacts = async (page = 1, perPage = 10): Promise<Contact[]> => {
  // For persistence, fetch contacts from the database.
  const contacts = await prisma.contact.findMany({
    skip: (page - 1) * perPage,
    take: perPage,
    orderBy: { createdAt: "desc" },
  });
  return contacts;
};

export const getContactById = async (id: number): Promise<Contact | null> => {
  return prisma.contact.findUnique({
    where: { id },
  });
};

export const importContacts = async (contactsData: Contact[]) => {
  // Bulk insert; you might add error handling.
  return prisma.contact.createMany({ data: contactsData });
};

export const exportContacts = async (): Promise<Contact[]> => {
  return prisma.contact.findMany();
};

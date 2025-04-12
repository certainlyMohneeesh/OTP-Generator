import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { getContactById } from "@/lib/contacts";
import { Contact } from "@prisma/client";
import Link from "next/link";

const ContactDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [contact, setContact] = useState<Contact | null>(null);

  useEffect(() => {
    if (id) {
      (async () => {
        const data = await getContactById(Number(id));
        setContact(data);
      })();
    }
  }, [id]);

  if (!contact) return <Layout>Loading...</Layout>;

  return (
    <Layout>
      <h2 className="text-2xl font-bold">Contact Details</h2>
      <p>
        <strong>Name:</strong> {contact.firstName} {contact.lastName}
      </p>
      <p>
        <strong>Phone:</strong> {contact.phone}
      </p>
      <Link href={`/messages?contactId=${contact.id}`}>
        <a className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded">
          Send Message
        </a>
      </Link>
    </Layout>
  );
};

export default ContactDetailPage;

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Contact } from "@prisma/client";
import Link from "next/link";
import axios from "axios";

const ContactDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          setLoading(true);
          const response = await axios.get(`/api/contacts?id=${id}`);
          setContact(response.data);
        } catch (err) {
          setError("Failed to load contact");
          console.error(err);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id]);

  if (loading) return <Layout>Loading...</Layout>;
  if (error) return <Layout>{error}</Layout>;
  if (!contact) return <Layout>Contact not found</Layout>;

  return (
    <Layout>
      <h2 className="text-2xl font-bold">Contact Details</h2>
      <p>
        <strong>Name:</strong> {contact.firstName} {contact.lastName}
      </p>
      <p>
        <strong>Phone:</strong> {contact.phone}
      </p>
      <Link href={`/messages?contactId=${contact.id}`} className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded">
        Send Message
      </Link>
    </Layout>
  );
};

export default ContactDetailPage;

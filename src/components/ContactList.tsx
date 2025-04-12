import { useEffect, useState } from "react";
import ContactItem from "./ContactItem";
import { getContacts } from "@/lib/contacts";
import { Contact } from "@prisma/client";

interface ContactListProps {
  page: number;
  setPage: (page: number) => void;
}

const ContactList: React.FC<ContactListProps> = ({ page, setPage }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const perPage = 10;

  useEffect(() => {
    (async () => {
      const data = await getContacts(page, perPage);
      setContacts(data);
    })();
  }, [page]);

  return (
    <div>
      {contacts.map((contact) => (
        <ContactItem key={contact.id} id={contact.id} firstName={contact.firstName} lastName={contact.lastName} />
      ))}
      {/* Pagination controls */}
      <div className="mt-4 flex justify-between">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage(page + 1)} className="px-4 py-2 bg-gray-300 rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default ContactList;

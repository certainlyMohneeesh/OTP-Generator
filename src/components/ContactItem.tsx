import Link from "next/link";

interface ContactItemProps {
  id: number;
  firstName: string;
  lastName: string;
}

const ContactItem: React.FC<ContactItemProps> = ({ id, firstName, lastName }) => {
  return (
    <Link href={`/contacts/${id}`} className="p-4 border-b hover:bg-gray-50">
        {firstName} {lastName}
    </Link>
  );
};

export default ContactItem;

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import ContactList from "@/components/ContactList";
import { useToast } from "@/components/ToastProvider";

const ContactsPage = () => {
  const [page, setPage] = useState(1);
  const { addToast } = useToast();

  // Handle CSV import/export (could open modals or trigger API calls)
  const handleExport = async () => {
    try {
      // call API to export CSV
      addToast({ message: "Contacts exported successfully", type: "success" });
    } catch {
      addToast({ message: "Failed to export contacts", type: "error" });
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Process CSV upload here (using FormData to send to /api/uploadContacts)
    addToast({ message: "Contacts imported successfully", type: "success" });
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Contacts</h2>
      <div className="mb-4 flex items-center space-x-4">
        <button onClick={handleExport} className="px-4 py-2 bg-indigo-500 text-white rounded">
          Export Contacts
        </button>
        <label className="px-4 py-2 bg-indigo-500 text-white rounded cursor-pointer">
          Import Contacts
          <input type="file" className="hidden" onChange={handleImport} />
        </label>
      </div>
      <ContactList page={page} setPage={setPage} />
    </Layout>
  );
};

export default ContactsPage;

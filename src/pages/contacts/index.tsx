import { useState } from "react";
import Layout from "@/components/Layout";
import ContactList from "@/components/ContactList";
import { useToast } from "@/components/ToastProvider";
import axios from "axios";

const ContactsPage = () => {
  const [page, setPage] = useState(1);
  const { addToast } = useToast();

  const handleExport = async () => {
    try {
      const response = await axios.get('/api/contacts?export=true');
      
      // Create CSV content
      const headers = "id,firstName,lastName,phone,email\n";
      const csvContent = headers + response.data.map((contact: any) => 
        `${contact.id},"${contact.firstName}","${contact.lastName}","${contact.phone}","${contact.email || ''}"`
      ).join('\n');
      
      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'contacts.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      addToast({ message: "Contacts exported successfully", type: "success" });
    } catch (error) {
      console.error(error);
      addToast({ message: "Failed to export contacts", type: "error" });
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      await axios.post('/api/uploadContacts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      addToast({ message: "Contacts imported successfully", type: "success" });
      // Refresh the current page to show new contacts
      setPage(1);
    } catch (error) {
      console.error(error);
      addToast({ message: "Failed to import contacts", type: "error" });
    }
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
          <input type="file" className="hidden" onChange={handleImport} accept=".csv" />
        </label>
      </div>
      <ContactList page={page} setPage={setPage} />
    </Layout>
  );
};

export default ContactsPage;

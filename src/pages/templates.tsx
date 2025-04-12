import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import axios from "axios";
import { useToast } from "@/components/ToastProvider";

interface Template {
  id: number;
  name: string;
  content: string;
}

const TemplatesPage = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const { addToast } = useToast();

  useEffect(() => {
    (async () => {
      // Fetch templates from API (implement /api/templates)
      const res = await axios.get("/api/templates");
      setTemplates(res.data);
    })();
  }, []);

  const handleAddTemplate = async () => {
    try {
      const res = await axios.post("/api/templates", { name, content });
      setTemplates((prev) => [...prev, res.data]);
      setName("");
      setContent("");
      addToast({ message: "Template added", type: "success" });
    } catch {
      addToast({ message: "Failed to add template", type: "error" });
    }
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold">Message Templates</h2>
      <div className="mt-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Template Name"
          className="border p-2 rounded w-full mb-2"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Template Content (use {otp} to insert OTP)"
          className="border p-2 rounded w-full mb-2"
          rows={3}
        ></textarea>
        <button onClick={handleAddTemplate} className="px-4 py-2 bg-blue-500 text-white rounded">
          Add Template
        </button>
      </div>
      <div className="mt-6">
        <h3 className="text-xl">Existing Templates</h3>
        <ul className="divide-y">
          {templates.map((template) => (
            <li key={template.id} className="p-4">
              <strong>{template.name}</strong>
              <p>{template.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default TemplatesPage;

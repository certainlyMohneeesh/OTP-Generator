import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import MessageList from "@/components/MessageList";
import { useRouter } from "next/router";

const MessagesPage = () => {
  const router = useRouter();
  const { contactId } = router.query; // optional pre-selected contact

  return (
    <Layout>
      <h2 className="text-2xl font-bold">Messages Sent</h2>
      <MessageList contactId={contactId ? Number(contactId) : undefined} />
    </Layout>
  );
};

export default MessagesPage;

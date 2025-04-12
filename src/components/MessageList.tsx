import useSWR from "swr";
import axios from "axios";

interface Message {
  id: number;
  content: string;
  otp: string;
  status: string;
  createdAt: string;
  contact: { firstName: string; lastName: string };
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const MessageList = ({ contactId }: { contactId?: number }) => {
  const { data, error } = useSWR(
    `/api/messages${contactId ? `?contactId=${contactId}` : ""}`,
    fetcher
  );

  if (error) return <div>Error loading messages.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <ul className="divide-y">
      {data.map((msg: Message) => (
        <li key={msg.id} className="p-4">
          <div>
            <strong>
              {msg.contact.firstName} {msg.contact.lastName}
            </strong>{" "}
            - {new Date(msg.createdAt).toLocaleString()}
          </div>
          <div>OTP: {msg.otp}</div>
          <div>Status: {msg.status}</div>
        </li>
      ))}
    </ul>
  );
};

export default MessageList;

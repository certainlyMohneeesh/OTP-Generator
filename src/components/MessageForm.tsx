import { useState, useEffect } from "react";
import { sendSMS } from "@/lib/sms";
import { useRouter } from "next/router";
import { useToast } from "./ToastProvider";

interface MessageFormProps {
  contactId: number;
  phone: string;
  template?: { content: string };
}

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const MessageForm: React.FC<MessageFormProps> = ({ contactId, phone, template }) => {
  const [otp, setOtp] = useState(generateOTP());
  const [timer, setTimer] = useState(300); // 5 minutes expiration timer in seconds
  const [message, setMessage] = useState(
    template ? template.content.replace("{otp}", otp) : `Hi. Your OTP is: ${otp}`
  );
  const { addToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          addToast({ message: "OTP expired. Generating new OTP...", type: "info" });
          const newOTP = generateOTP();
          setOtp(newOTP);
          setMessage(template ? template.content.replace("{otp}", newOTP) : `Hi. Your OTP is: ${newOTP}`);
          return 300;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [addToast, template]);

  const handleSend = async () => {
    try {
      const expiresAt = new Date(Date.now() + 300 * 1000);
      await sendSMS({ to: phone, content: message, otp, contactId, expiresAt });
      addToast({ message: "Message sent successfully!", type: "success" });
      router.push("/messages");
    } catch (error: any) {
      addToast({ message: error.message || "Failed to send message", type: "error" });
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full border p-2 rounded"
        rows={4}
      />
      <div>
        <span className="text-sm">OTP expires in: {timer} seconds</span>
      </div>
      <button onClick={handleSend} className="px-4 py-2 bg-green-500 text-white rounded">
        Send
      </button>
    </div>
  );
};

export default MessageForm;

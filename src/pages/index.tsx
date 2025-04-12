import Link from "next/link";
import Layout from "@/components/Layout";

const Home = () => {
  return (
    <Layout>
      <div className="flex flex-col space-y-4 items-center justify-center">
        <h1 className="text-3xl font-bold">Welcome to 1 Time</h1>
        <p className="text-lg">Your one-time password generator</p>
        <p className="text-lg">Get started by creating a new OTP</p>
        <div className="space-x-4">
          <Link href="/contacts" className="px-4 py-2 bg-blue-500 text-white rounded">
            Contacts
          </Link>
          <Link href="/messages" className="px-4 py-2 bg-green-500 text-white rounded">
            Messages
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

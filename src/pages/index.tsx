import Link from "next/link";
import Layout from "@/components/Layout";

const Home = () => {
  return (
    <Layout>
      <div className="flex flex-col space-y-4 items-center justify-center">
        <h1 className="text-3xl font-bold">Welcome to My OTP App</h1>
        <div className="space-x-4">
          <Link href="/contacts">
            <a className="px-4 py-2 bg-blue-500 text-white rounded">Contacts</a>
          </Link>
          <Link href="/messages">
            <a className="px-4 py-2 bg-green-500 text-white rounded">Messages</a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

// src/components/Layout.tsx
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ToastContainer } from "@/components/ToastProvider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div>
          <Link href="/" className="font-bold text-xl">
            1 Time
          </Link>
        </div>
        <nav>
          <Link href="/contacts" className="mx-2">
            Contacts
          </Link>
          <Link href="/messages" className="mx-2">
            Messages
          </Link>
          <Link href="/templates" className="mx-2">
            Templates
          </Link>
          {session ? (
            <button onClick={() => signOut()} className="mx-2">
              Sign Out
            </button>
          ) : (
            <Link href="/api/auth/signin" className="mx-2">
            Sign In
            </Link>

          )}
        </nav>
      </header>
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <ToastContainer />
      <footer className="bg-gray-200 text-center p-4">
        © {new Date().getFullYear()} 1 Time
      </footer>
    </div>
  );
};

export default Layout;

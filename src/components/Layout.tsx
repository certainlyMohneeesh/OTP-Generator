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
          <Link href="/">
            <a className="font-bold text-xl">1 Time</a>
          </Link>
        </div>
        <nav>
          <Link href="/contacts">
            <a className="mx-2">Contacts</a>
          </Link>
          <Link href="/messages">
            <a className="mx-2">Messages</a>
          </Link>
          <Link href="/templates">
            <a className="mx-2">Templates</a>
          </Link>
          {session ? (
            <button onClick={() => signOut()} className="mx-2">
              Sign Out
            </button>
          ) : (
            <Link href="/api/auth/signin">
              <a className="mx-2">Sign In</a>
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

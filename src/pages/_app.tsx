import { SessionProvider } from "next-auth/react";
import "@/app/globals.css";
import { ToastProvider } from "@/components/ToastProvider"; // Custom provider wrapping shadcn toast

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  return (
    <SessionProvider session={session}>
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </SessionProvider>
  );
}

export default MyApp;

import React from "react";
import "../styles/globals.css";
import Layout from "../components/Layout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>1 Time</title>
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

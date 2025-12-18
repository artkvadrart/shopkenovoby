import type { Metadata } from "next";
import "./globals.css";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className=" bg-zinc-300">
        <div>
        {children}
        </div>
      </body>
    </html>
  );
}

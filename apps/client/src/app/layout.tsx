import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EShop",
  description: "Developed by AkaDNT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

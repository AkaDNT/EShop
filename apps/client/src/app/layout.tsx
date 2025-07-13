import type { Metadata } from "next";
import "./globals.css";
import ToastLayout from "@/components/toast-layout";
import { Providers } from "./provider";

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
      <body suppressHydrationWarning>
        <Providers>
          {children}
          <ToastLayout></ToastLayout>
        </Providers>
      </body>
    </html>
  );
}

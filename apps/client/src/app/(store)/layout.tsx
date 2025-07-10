"use client";
import Navbar from "@/components/client/navbar/navbar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar></Navbar>
      {children}
    </div>
  );
}

"use client";
import Footer from "@/components/client/footer/footer";
import Navbar from "@/components/client/navbar/navbar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-[100vh]">
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </div>
  );
}

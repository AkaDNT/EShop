import Side from "@/components/admin/sidebar/sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-[100vh]">
      <Side></Side>
      {children}
    </div>
  );
}

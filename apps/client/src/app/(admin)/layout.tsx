import Side from "@/components/admin/sidebar/sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-[100vh] overflow-x-hidden overflow-y-auto">
      <Side></Side>
      {children}
    </div>
  );
}

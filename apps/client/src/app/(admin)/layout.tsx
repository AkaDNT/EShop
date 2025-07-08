import Side from "@/components/admin/sidebar/sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Side></Side>
      {children}
    </div>
  );
}

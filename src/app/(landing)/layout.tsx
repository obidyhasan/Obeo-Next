import Navbar from "@/components/shared/Navbar/Navbar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="min-h-[calc(100vh-66.67px)]">{children}</div>
    </div>
  );
}

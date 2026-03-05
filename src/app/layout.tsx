import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Obeo PMS - Hotel Management System",
  description:
    "OBEO PMS is Bangladesh’s first AI-integrated Property Management System designed to simplify hotel and property operations like never before. With intelligent AI assistance, reservations can be created instantly using voice commands—no need for lengthy or traditional form filling unless you want it. From booking creation to daily operations, OBEO PMS lets you manage everything faster, smarter, and more naturally. It’s built for modern hotels and properties that want efficiency, automation, and a seamless guest experience powered by AI.",
  keywords: ["obeo pms", "obeopms", "bangladeshi pms", "obeo", "obeorooms"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster richColors position="top-center" />
        {children}
      </body>
    </html>
  );
}

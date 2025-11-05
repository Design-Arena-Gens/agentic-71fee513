import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "منصة تيست",
  description: "تجربة تفاعلية لمراجعة المعلومات بسرعة وسهولة."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-surface text-primary antialiased">{children}</body>
    </html>
  );
}

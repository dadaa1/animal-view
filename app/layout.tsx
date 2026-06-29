import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frog Anatomy Viewer",
  description: "An interactive 3D frog dissection visualization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

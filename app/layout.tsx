import type { Metadata } from "next";
import { fonts } from "@/constants"
import "./globals.css";

export const metadata: Metadata = {
  title: "LiveDocs",
  description: "Your go-to collaborative editor",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { geistSans, geistMono } = fonts;
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { fonts } from "@/constants";
import { ClerkProvider } from "@clerk/nextjs";
import { Provider } from "./Provider";
import { dark } from "@clerk/themes"
import "./globals.css";

export const metadata: Metadata = {
  title: "LiveDocs",
  description: "Your go-to collaborative editor",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { geistSans, geistMono } = fonts;
  return (
    <ClerkProvider appearance={{ 
      baseTheme: dark, 
      variables: { 
        colorPrimary: "#3371FF",
        fontSize: "16px"
      }
    }}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
        >
          <Provider>
            {children}
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}

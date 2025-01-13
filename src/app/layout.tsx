import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { UserProvider } from "@/provider/user-provider";
import { cookies } from "next/headers";
import { Footer } from "@/components/footer";
import Header from "@/components/header";
import { Providers } from './providers';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Bacola-Grocery Market and Food Store",
  description: "Online Grocery Shopping Center",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get("token")?.value;
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <UserProvider token={token}>
            <Header />
            {children}
            <Footer />
          </UserProvider>
        </Providers>
      </body>
    </html>
  );
}

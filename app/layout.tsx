import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ToastProvider } from "@/providers/ToastProvider";
import NextAuthProvider from "@/providers/NextAuthProvider";
import ToolTipProvider from "@/providers/ToolTipProvider";
import { Poppins } from "next/font/google";
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

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Manga Match",
  description: "A manga sharing platform ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}  antialiased`}>
        <NextAuthProvider>
          <ToastProvider />
          <ToolTipProvider>
            <Navbar />
            {children}
            <Footer />
          </ToolTipProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}

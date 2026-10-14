import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
    template: "%s | বাজার দর",
  },
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।",
};

// প্রতি request এ ঠিক করা হবে কে login করা আছে — তাই page গুলো আগে থেকে বানিয়ে রাখা (static) হয় না
export const dynamic = "force-dynamic";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <body className="flex min-h-screen flex-col">
        <Header />
        <Ticker />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#fafcfa",
              color: "#1d271f",
              border: "1px solid #e1e8e1",
              borderRadius: "12px",
              fontSize: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}

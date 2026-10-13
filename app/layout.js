import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TDC Matchmaker Portal",
  description: "Internal Matchmaking Dashboard & CRM",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      {/* Updated body class to ensure it acts as a clean full-viewport container */}
      <body className="min-h-screen bg-[#EAEBF0] text-slate-900 m-0 p-0 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
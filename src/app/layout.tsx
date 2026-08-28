import type { Metadata } from "next";
import { Inter, Roboto, Fira_Code } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/layout/ChatWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  style: ["normal"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "InfiniT – IT Department Association | Info Institute of Engineering",
  description:
    "InfiniT is the official IT Department Association of Info Institute of Engineering, Coimbatore. Involve. Inspire. Illuminate.",
  openGraph: {
    title: "InfiniT – IT Department Association",
    description:
      "Involve. Inspire. Illuminate. The official IT dept association of Info Institute of Engineering.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${roboto.variable} ${firaCode.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="antialiased">
        <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-[#050505] to-[#0A0A0A] text-[#F3F4F6]">
          {/* Navbar is fixed at top-0 */}
          <Navbar />

          {/* Spacer that matches the fixed navbar height so page content never hides beneath it */}
          <div className="h-16 md:h-20 flex-shrink-0" aria-hidden="true" />

          <main className="flex-grow w-full relative pb-12 flex flex-col items-center">
            {children}
          </main>

          <Footer />
          <ChatWidget />
        </div>
      </body>
    </html>
  );
}
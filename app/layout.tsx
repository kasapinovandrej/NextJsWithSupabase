import type { Metadata } from "next";

import { Josefin_Sans } from "next/font/google";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

import "@/styles/globals.css";
import Header from "@/components/Header";
import { ReservationProvider } from "@/components/ReservationContext";

export const metadata: Metadata = {
  // title: "The Wild Oasis",
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the hart of the Italian Dolomiter, surrounded by beautiful mountains and dark forests",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-primary-950 text-primary-100 min-h-screen ${josefin.className} flex flex-col antialiased relative`}
      >
        <Header />
        <div className="flex-1  px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}

import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import AppWalletProvider from "../context/AppWalletProvider";
import UserDataProvider from "@/context/UserDataProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gladiators.Meme",
  description: "Fight with your favorite memecoins",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={` ${montserrat.className} font-montserrat`}>
      <body className="flex items-center justify-center w-full flex-grow flex-col min-h-screen">
        <AppWalletProvider>
          <UserDataProvider>{children}</UserDataProvider>
        </AppWalletProvider>
      </body>
    </html>
  );
}

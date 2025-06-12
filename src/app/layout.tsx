import type { Metadata } from "next";

import "./globals.css";
import {
  circularWeb,
  general,
  robertMedium,
  robertRegular,
  zentry,
} from "../fonts";

export const metadata: Metadata = {
  title: "Zentry Clone",
  description:
    "A Next.js clone of the landing page for the Web3, Zentry. Built using Next.js, Tailwind CSS, and GSAP.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${zentry.variable} ${circularWeb.variable} ${general.variable} ${robertRegular.variable} ${robertMedium.variable}`}
    >
      <body className={` ${zentry.className} antialiased`}>{children}</body>
    </html>
  );
}

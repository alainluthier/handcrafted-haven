import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Header from "@/components/header/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Catalog | Handcrafted Haven",
  description:
    "Catalog of our products. Users can see unique handcrafted items.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main lang="en">
      <Header />
      <div className={inter.className}>{children}</div>
    </main>
  );
}

import type { Metadata } from "next";
import MainLayout from "@/components/layout/MainLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: "MrRent - Car Rental",
  description: "MrRent Car Rental Management System",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}

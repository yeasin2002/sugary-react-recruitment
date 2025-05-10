import type { Metadata } from "next";
import { fontVariable } from "@/fonts";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Sugary",
  description:
    "You can get everything you want if you work hard, trust the process, and stick to the plan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontVariable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

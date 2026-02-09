import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/features/theme/theme-provider";
import { ConsentPopup } from "@/features/consent";
import { LocaleProvider } from "@/features/i18n/locale-provider";
import Header from "@/components/layouts/main/header";
import Footer from "@/components/layouts/main/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Dev App",
//   description: "Application used for development purposes",
// };

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LocaleProvider locale={lang}>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </LocaleProvider>
          <ConsentPopup />
        </ThemeProvider>
      </body>
    </html>
  );
}

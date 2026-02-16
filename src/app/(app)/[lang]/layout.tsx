import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

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

export default async function RootLayout(props: LayoutProps<"/[lang]">) {
  const { lang } = await props.params;

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <Script
          defer
          src="https://umami.dihub.dev/script.js"
          data-website-id="95025184-a0c8-4972-be84-ec93babf008b"
        ></Script>
      </head>
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
            <main className="min-h-screen">{props.children}</main>
            <Footer />
          </LocaleProvider>
          <ConsentPopup />
        </ThemeProvider>
      </body>
    </html>
  );
}

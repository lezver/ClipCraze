import type { Metadata } from "next";
import "./globals.css";
import clsx from "clsx";
import { Raleway, Manrope, Sansation } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Main from "@/components/layout/Main";
import { ModalProvider } from "@/providers/ModalProvider";
import { Toaster } from "react-hot-toast";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
});

const sansation = Sansation({
  subsets: ["latin"],
  variable: "--font-sansation",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Aleko Sokurashvili",
  description: "Test",
};

type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body
        className={clsx(
          "bg-jaguar grid min-h-screen grid-rows-[auto_1fr_auto] text-white",
          raleway.variable,
          manrope.variable,
          sansation?.variable,
        )}
      >
        <NextIntlClientProvider>
          <ModalProvider>
            <Header />

            <Main>{children}</Main>

            <Footer />
            <Toaster />
          </ModalProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ODS 13 Desarrollo Sostenible",
  description: "Web sobre los Objetivos de Desarrollo Sostenible",
  authors: [{name: "CrIsTiiAnPvP", url: "https://github.com/CrIsTiAnPvP"}],
};

type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{locale: string}>
}

export default async function RootLayout({ children, params }: RootLayoutProps) {

  const { locale } = await params;
  
  if (!routing.locales.includes(locale as "es" | "en")) {
    return notFound();
  }

  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
         </NextIntlClientProvider>
      </body>
    </html>
  );
}

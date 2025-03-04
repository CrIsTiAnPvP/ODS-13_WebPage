import type { Metadata } from "next";
import "./globals.css";

import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "ODS 13 Desarrollo Sostenible",
  description: "Web sobre los Objetivos de Desarrollo Sostenible",
  authors: [{name: "CrIsTiiAnPvP", url: "https://github.com/CrIsTiAnPvP"}],
  icons: {icon: "/images/ods13.jpg"}
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
      <body className="antialiased bg-gradient-to-br from-gray-200 via-slate-400 to-green-500">
         <NextIntlClientProvider locale={locale} messages={messages}>
            <div className="flex flex-col min-h-screen scroll-smooth">
              {children}
            </div>
            <Toaster />
         </NextIntlClientProvider>
      </body>
    </html>
  );
}

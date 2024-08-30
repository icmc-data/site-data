import { ThemeProvider } from "./components/ThemeProvider";
import type { Metadata } from "next";
import {
  AbstractIntlMessages,
  NextIntlClientProvider,
  useMessages,
} from "next-intl";
import { Inter, Montserrat } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Header } from "./components/Header";
import Particle from "./components/Particle";
import "./globals.css";
import { Footer } from "../[locale]/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--inter",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"], // você pode ajustar o peso conforme necessário
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Data ICMC",
  description:
    "Grupo de Extensão em Ciência de Dados e Inteligência Artificial da Universidade de São Paulo",
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();

  // Lógica para definir "br" para português e "en" para outros idiomas
  const languageCode = locale === "pt" ? "br" : "en";

  return (
    <html
      lang={locale}
      className={`overflow-x-hidden ${inter.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <body className="relative">
        <ThemeProvider
          enableSystem
          attribute="class"
          defaultTheme="system"
          themes={["light", "dark"]}
        >
          <NextIntlClientProvider
            locale={locale}
            messages={messages as AbstractIntlMessages}
          >
            <NextTopLoader
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              easing="ease"
              speed={200}
              color="var(--primary)"
              showSpinner={false}
            />
            <Header locale={languageCode} />
            <div className="absolute inset-0 z-0">
              <Particle />
            </div>
            <main className="relative z-10 mx-auto max-w-screen-2xl p-4 md:p-8">
              {children}
            </main>
          </NextIntlClientProvider>
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}

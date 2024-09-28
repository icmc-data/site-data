import { ThemeProvider } from "./components/ThemeProvider";
import type { Metadata } from "next";
import {
  AbstractIntlMessages,
  NextIntlClientProvider,
  useMessages,
} from "next-intl";
import { Inter, Montserrat, Orbitron } from "next/font/google"; // Importando a fonte Orbitron
import NextTopLoader from "nextjs-toploader";
import { Header } from "./components/Header";
import Particle from "./components/Particle";
import "./globals.css";
import { Footer } from "../[locale]/components/Footer";
import { cookies } from 'next/headers'; // para ler cookies no lado do servidor
import Sponsors from "./components/Sponsors";

const inter = Inter({
  subsets: ["latin"],
  variable: "--inter",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-orbitron",
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

  // ler o cookie para determinar o idioma
  const userLocaleCookie = cookies().get('preferredLocale')?.value;
  const languageCode = userLocaleCookie || "br"; // se o cookie não existir, use "br"

  const sponsorsData = [
    { logoUrl: "/images/icmc-logo.png" },
    { logoUrl: "/images/brains.png" },
    { logoUrl: "/images/centerIA.png" },
    // adicione mais patrocinadores conforme necessário
  ];

  return (
    <html lang={languageCode} className={`${inter.variable} ${montserrat.variable} ${orbitron.variable}`}>
      <body className="relative min-h-screen flex flex-col">
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
            <main className="relative z-10 mx-auto max-w-screen-2xl p-4 md:p-8 flex-grow">
              {children}
            </main>
            <Footer locale={locale} />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

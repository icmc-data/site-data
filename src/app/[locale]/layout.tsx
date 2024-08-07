import { ThemeProvider } from "./components/ThemeProvider";
import type { Metadata } from "next";
import {
  AbstractIntlMessages,
  NextIntlClientProvider,
  useMessages,
} from "next-intl";
import { Inter, Brawler } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Header } from "./components/Header";
import Particle from "./components/Particle";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--inter",
});
const brawler = Brawler({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-brawler",
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
  return (
    <html
      lang={locale}
      className={`overflow-x-hidden ${inter.variable} ${brawler.variable}`} // Adicione a classe overflow-x-hidden aqui
      suppressHydrationWarning
    >
      <body className="relative">
        {" "}
        {/* Adicione a classe relative para o posicionamento absoluto do Particle */}
        <ThemeProvider
          enableSystem
          attribute="class"
          defaultTheme="light"
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
              shadow="0 0 10px #2299DD,0 0 5px #2299DD"
              color="var(--primary)"
              showSpinner={false}
            />
            <Header locale={locale} />
            <div className="absolute">
              <Particle />
            </div>
            <main className="mx-auto max-w-screen-2xl relative z-10">
              {children}
            </main>{" "}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

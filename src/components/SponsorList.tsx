import React from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "./ThemeProvider";

export interface SponsorListProps {
  /**
   * If provided, only sponsors whose `name` appears in this array
   * will be shown. Otherwise, all sponsors will be rendered.
   */
  names?: string[];
}

export function SponsorList({ names }: SponsorListProps) {
  const { t } = useTranslation("home");
  const { theme } = useTheme();

  const allSponsors = [
    {
      name: "ICMC-USP",
      logo:
        theme === "dark"
          ? "/images/sponsors/icmc-logo.png"
          : "/images/sponsors/icmc-logo-white.png",
      url: "https://icmc.usp.br/",
    },
    {
      name: "C4AI",
      logo:
        theme === "dark"
          ? "/images/sponsors/centerIA.png"
          : "/images/sponsors/centerIA-white.png",
      url: "https://c4ai.inova.usp.br/",
    },
    {
      name: "Alura",
      logo:
        theme === "dark"
          ? "/images/sponsors/alura-logo.png"
          : "/images/sponsors/alura-logo-white.png",
      url: "https://www.alura.com.br/",
    },
    {
      name: "CEMEAI",
      logo:
        theme === "dark"
          ? "/images/sponsors/cemac-logo.png"
          : "/images/sponsors/cemac-logo-white.png",
      url: "https://cemeai.icmc.usp.br/",
    },
    {
      name: "SBMAC",
      logo:
        theme === "dark"
          ? "/images/sponsors/sbmac-logo.png"
          : "/images/sponsors/sbmac-logo.png",
      url: "https://www.sbmac.org.br/",
    },
    {
      name: "iFood",
      logo:
        theme === "dark"
          ? "/images/sponsors/ifood-logo.png"
          : "/images/sponsors/ifood-logo-white.png",
      url: "https://www.sbmac.org.br/",
    },
    {
      name: "Tractian",
      logo:
        theme === "dark"
          ? "/images/sponsors/tractian-logo.png"
          : "/images/sponsors/tractian-logo-white.png",
      url: "https://www.sbmac.org.br/",
    },
    {
      name: "KHIPUx",
      logo:
        theme === "dark"
          ? "/images/sponsors/khipu-logo.png"
          : "/images/sponsors/khipu-logo.png",
      url: "https://www.sbmac.org.br/",
    },
    {
      name: "CCEx",
      logo:
        theme === "dark"
          ? "/images/sponsors/ccex-logo.png"
          : "/images/sponsors/ccex-logo.png",
      url: "https://www.sbmac.org.br/",
    },
    {
      name: "FIPAI",
      logo:
        theme === "dark"
          ? "/images/sponsors/fipai-logo.png"
          : "/images/sponsors/fipai-logo-white.png",
      url: "https://www.fipai.org.br",
    },
    {
      name: "RAIA",
      logo:
        theme === "dark"
          ? "/images/sponsors/raia-logo.png"
          : "/images/sponsors/raia-logo.png",
      url: "https://grupo-raia.org/",
    }
  ];

  const sponsorsToShow = Array.isArray(names) && names.length > 0
    ? allSponsors.filter((s) => names.includes(s.name))
    : allSponsors;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-2">{t("sponsors.title")}</h2>
          <p className="text-muted-foreground">{t("sponsors.subtitle")}</p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-20">
          {sponsorsToShow.map((sponsor) => (
            <a
              key={sponsor.name}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <div className="w-40 h-20 flex items-center justify-center">
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

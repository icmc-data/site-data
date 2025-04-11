import { useTranslation } from "react-i18next";
import { useTheme } from "./ThemeProvider";

export function SponsorList() {
  const { t } = useTranslation("home");
  const { theme } = useTheme();
  
  const sponsors = [
    {
      name: "ICMC-USP",
      logo: theme === "dark" ? "/images/sponsors/icmc-logo.png" : "/images/sponsors/icmc-logo-white.png",
      url: "https://icmc.usp.br/",
    },
    {
      name: "C4AI",
      logo: theme === "dark" ? "/images/sponsors/centerIA.png" : "/images/sponsors/centerIA-white.png",
      url: "https://c4ai.inova.usp.br/",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-2">{t("sponsors.title")}</h2>
          <p className="text-muted-foreground">{t("sponsors.subtitle")}</p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-20">
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.name}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="h-24 md:h-24 object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

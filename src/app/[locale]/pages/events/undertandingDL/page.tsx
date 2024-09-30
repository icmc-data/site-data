"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Hero from "../../../components/Hero";
import "./style.css";
import UDLLogo from "@/public/images/UDLLogo.png";
import UDLLogoWhite from "@/public/images/UDLLogo-white.png";
import FAQ from "../../../components/FAQ";
import Schedule from "../../../components/Schedule";
import LogoIcon from "../../../../icons/logo";
import Sponsors from "../../../components/Sponsors";

// Importa os arquivos JSON para ambos os idiomas
import eventDataBr from "@/data/br/udl2024.json";
import eventDataEn from "@/data/en/udl2024.json";
import faqDataBr from "@/data/br/udlFaq.json";
import faqDataEn from "@/data/en/udlFaq.json";

export default function UnderstandingDL() {
  const t = useTranslations("");
  const { resolvedTheme } = useTheme();
  const [logoSrc, setLogoSrc] = useState(UDLLogo.src);

  // Determina o idioma atual da página
  const locale = t("DONT_DELETE"); // Presumo que "DONT_DELETE" é a sua chave para obter o locale

  // Seleciona os dados corretos com base no idioma
  const eventData = locale === "br" ? eventDataBr : eventDataEn;
  const faqData = locale === "br" ? faqDataBr : faqDataEn;

  useEffect(() => {
    const updatedLogoSrc =
      resolvedTheme === "light" ? UDLLogoWhite.src : UDLLogo.src;
    setLogoSrc(updatedLogoSrc);
  }, [resolvedTheme]);

  const sponsorsData = [
    { logoUrl: "/images/icmc-logo.png" },
    { logoUrl: "/images/brains.png" },
    { logoUrl: "/images/centerIA.png" },

    // adicione mais patrocinadores conforme necessário
  ];
  return (
    <div className="mt-32">
      <Hero
        title={t("UDLHero.title")}
        description={t("UDLHero.description")}
        eventDateTitle={t("UDLHero.eventDateTitle")}
        dateText={t("UDLHero.dateText")}
        speakersTitle={t("UDLHero.speakersTitle")}
        speakersText={t("UDLHero.speakersText")}
        imgLink={logoSrc}
        dateLink={`/${locale}/pages/events/undertandingDL/register`} // Certifique-se de que este link também esteja correto
        speakersLink={`/${locale}/pages/events/undertandingDL/speakers`}
        dateButtonText={t("UDLHero.dateButtonText")}
        eventButtonText={t("UDLHero.speakersButtonText")}
      />
      <br />
      <br />

      <div className="about-event">
        <h2>{t("AboutEvent.Parte_1")}</h2>
        <p style={{ paddingTop: "20px" }}>{t("AboutEvent.Parte_2")}</p>
        <br />
        <p>{t("AboutEvent.Parte_3")}</p>
      </div>
      <br />
      <br />
      <Schedule eventData={eventData} />
      {/* Seção de patrocinadores */}
      <section className="mt-10">
        <Sponsors sponsors={sponsorsData} />
      </section>
      <FAQ data={faqData} />
    </div>
  );
}

"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Hero from "../../../components/Hero";
import "./style.css";
import UDLLogo from "@/public/images/udl2024/UDLLogo.png";
import UDLLogoWhite from "@/public/images/UDLLogo-white.png";
import FAQ from "../../../components/FAQ";
import Schedule, { EventData } from "../../../components/Schedule";
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
        dateLink={`/${locale}/pages/events/understandingDL/register`} // Certifique-se de que este link também esteja correto
        speakersLink={`/${locale}/pages/events/understandingDL/speakers`}
        dateButtonText={t("UDLHero.dateButtonText")}
        eventButtonText={t("UDLHero.speakersButtonText")}
      />
      <br />
      <br />

      <h2 className="text-3xl font-bold text-[var(--primary)] mb-6">
        {t("AboutEvent.Parte_1")}
      </h2>
      <div className="about-event  mx-auto px-2 md:px-4 lg:px-8">
        <p className="text-lg text-[var(--text-secondary)] mb-6 leading-relaxed">
          <span className="font-bold">{t("AboutEvent.Parte_2")}</span>{" "}
          {t("AboutEvent.Parte_3")}
          <span className="font-bold"> {t("AboutEvent.Parte_4")}</span>{" "}
          {t("AboutEvent.Parte_5")}
          <span className="font-bold"> {t("AboutEvent.Parte_5-1")}</span>.{" "}
          {t("AboutEvent.Parte_6")}
          <br />
          <span
            className="font-bold underline cursor-pointer text-[var(--primary)] hover:text-[var(--secondary)] transition-colors duration-300"
            onClick={() => (window.location.href = `/${locale}/`)}
          >
            {" "}
            {t("AboutEvent.Parte_7")}
          </span>
        </p>
        <p className="text-lg text-[var(--text-secondary)] mb-6 leading-relaxed">
          {t("AboutEvent.Parte_8")}
          <span className="font-bold"> {t("AboutEvent.Parte_9")}</span>.
        </p>
        <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
          {t("AboutEvent.Parte_10")}
          <span className="font-bold"> {t("AboutEvent.Parte_11")}</span>{" "}
          {t("AboutEvent.Parte_12")}
          <span className="font-bold"> {t("AboutEvent.Parte_13")}</span>{" "}
          {t("AboutEvent.Parte_14")}
          <span className="font-bold"> {t("AboutEvent.Parte_15")}</span>.
        </p>
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

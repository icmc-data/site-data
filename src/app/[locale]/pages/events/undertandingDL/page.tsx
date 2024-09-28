"use client";
import { useTranslations } from "next-intl";
import React from "react";
import Hero from "../../../components/Hero";
import "./style.css";

export default function UnderstandingDL() {
  const t = useTranslations("");

  return (
    <div>
      <Hero
        title={t("UDLHero.title")}
        description={t("UDLHero.description")}
        eventDateTitle={t("UDLHero.eventDateTitle")}
        dateText={t("UDLHero.dateText")}
        speakersTitle={t("UDLHero.speakersTitle")}
        speakersText={t("UDLHero.speakersText")}
        imgLink="https://yt3.googleusercontent.com/WOOCC8PkqyMdpIMj0Wu05WX4W9Zyfb21WXdUf3rw5GbUZ3ZcAuCKe1P_1qhEy_RTa5n6synAnw=s900-c-k-c0x00ffffff-no-rj"
        dateLink="/pages/about"
        speakersLink="/pages/speakers"
        dateButtonText={t("UDLHero.dateButtonText")}
        eventButtonText={t("UDLHero.speakersButtonText")}
      />

      <div className="about-event">
        <h2>SOBRE O EVENTO</h2>
        <p>
          O <strong>UnderstandingDL 2024</strong> é um evento internacional
          organizado pelo <strong>Grupo Data</strong> da USP São Carlos, que se
          dedica ao estudo e à disseminação de conhecimento em Data Science no
          Instituto de Ciências Matemáticas e de Computação (ICMC). Se quiser
          saber mais sobre o Data: <a href="/${locale}/">Clique aqui</a>. O
          objetivo do evento é reunir pesquisadores de diversas partes do mundo
          para apresentar suas pesquisas e tornar o conhecimento mais acessível
          para todos. Entre os temas abordados nas palestras estão{" "}
          <strong>LLMs Multilinguais</strong>,{" "}
          <strong>
            Representação de Imagens em Multirresolução usando Redes Neurais
          </strong>
          , entre muitos outros. O <strong>UnderstandingDL 2024</strong> busca
          dar visibilidade aos pesquisadores e suas contribuições. Grupos como o{" "}
          <strong>Brains</strong> e o <strong>C4AI</strong> apoiam e patrocinam
          o evento, além do suporte da maior universidade da América Latina, a{" "}
          <strong>Universidade de São Paulo</strong>.
        </p>
      </div>
    </div>
  );
}

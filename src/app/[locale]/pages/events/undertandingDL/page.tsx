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
    </div>
  );
}

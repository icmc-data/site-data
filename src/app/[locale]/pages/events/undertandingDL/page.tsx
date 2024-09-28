"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Hero from "../../../components/Hero";
import "./style.css";
import UDLLogo from "@/public/images/UDLLogo.png";
import UDLLogoWhite from "@/public/images/UDLLogo-white.png";

export default function UnderstandingDL() {
  const t = useTranslations("");
  const { resolvedTheme } = useTheme();
  const [logoSrc, setLogoSrc] = useState(UDLLogo.src);

  useEffect(() => {
    const updatedLogoSrc = resolvedTheme === "light" ? UDLLogoWhite.src : UDLLogo.src;
    setLogoSrc(updatedLogoSrc);
  }, [resolvedTheme]);

  return (
    <div>
      <Hero
        title={t("UDLHero.title")}
        description={t("UDLHero.description")}
        eventDateTitle={t("UDLHero.eventDateTitle")}
        dateText={t("UDLHero.dateText")}
        speakersTitle={t("UDLHero.speakersTitle")}
        speakersText={t("UDLHero.speakersText")}
        imgLink={logoSrc}
        dateLink="/pages/about"
        speakersLink="/pages/speakers"
        dateButtonText={t("UDLHero.dateButtonText")}
        eventButtonText={t("UDLHero.speakersButtonText")}
      />
    </div>
  );
}

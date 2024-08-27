"use client";
import { useTranslations } from "next-intl";

import React from "react";
import Hero from "../../../components/Hero";

export default function UnderstandingDL() {
  const t = useTranslations("");

  return (
    <div>
      <Hero
        dateText="14-18 Setembro @ São Carlos"
        titleText="Understanding Deep Learning"
        descriptionText="Expanda sua compreensão sobre Inteligência Artificial e suas aplicações"
        buttonText="Inscreva-se"
        progress={false}
      />
    </div>
  );
}

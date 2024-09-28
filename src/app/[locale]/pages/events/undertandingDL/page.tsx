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
      />
     
    </div>
  );
}

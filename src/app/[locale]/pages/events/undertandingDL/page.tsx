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
        dateText="14-18 Setembro @ São Carlos"
        titleText="Understanding Deep Learning"
        descriptionText="Expanda sua compreensão sobre Inteligência Artificial e suas aplicações"
        buttonText="Inscreva-se"
        progress={false}
      />
      <div id="container-principal">
        {/* Primeira palestra */}
        <div className="palestra">
          <img
            src="/path/to/image1.jpg"
            alt="Palestra 1"
            className="palestra-img"
          />
          <p className="palestra-text">Descrição da Palestra 1</p>
        </div>
        {/* Segunda palestra */}
        <div className="palestra">
          <img
            src="/path/to/image2.jpg"
            alt="Palestra 2"
            className="palestra-img"
          />
          <p className="palestra-text">Descrição da Palestra 2</p>
        </div>
      </div>
    </div>
  );
}

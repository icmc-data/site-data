import React from "react";
import { useTranslations } from "next-intl";
import CardComponent from "../../components/Card";
import { Footer } from "../../components/Footer";

export default function Fronts() {
  const t = useTranslations();

  const cardsData = [
    {
      image: "/images/studygroups.jpeg",
      title: t("FrontsSection.Study_Groups"),
      description: t("FrontsSection.Study_Groups_Description"),
    },
    {
      image: "/images/projects.jpeg",
      title: t("FrontsSection.Projects"),
      description: t("FrontsSection.Projects_Description"),
    },
    {
      image: "/images/events.jpg",
      title: t("FrontsSection.Events"),
      description: t("FrontsSection.Events_Description"),
    },
    {
      image: "/images/maketing.jpg",
      title: t("FrontsSection.Marketing"),
      description: t("FrontsSection.Marketing_Description"),
    },
    {
      image: "/images/secretariat.jpg",
      title: t("FrontsSection.Secretariat"),
      description: t("FrontsSection.Secretariat_Description"),
    },
    {
      image: "/images/teaching.jpg",
      title: t("FrontsSection.Teaching"),
      description: t("FrontsSection.Teaching_Description"),
    },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen py-10 px-4 md:px-10 mt-24">
      <div className="w-full text-center md:text-left md:max-w-full">
        <h1 className="text-3xl md:text-5xl font-bold">{t("Header.Fronts")}</h1>
        <br />
        <p className="leading-loose text-base md:text-lg">
          {t("FrontsSection.Fronts_Description")}
        </p>
        <br />
        <p className="leading-loose text-base md:text-lg">
          {t("FrontsSection.Fronts_Description_2")}
        </p>
        <br />
      </div>

      <div
        className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-20"
        style={{ marginBottom: "100px" }}
      >
        {cardsData.map((card, index) => (
          <CardComponent
            key={index}
            image={card.image}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
}

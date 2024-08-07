import React from 'react';
import { useTranslations } from 'next-intl';
import CardComponent from '../../components/Card';

export default function Fronts() {
  const t = useTranslations();

  const cardsData = [
    {
      image: "https://via.placeholder.com/250x300",
      title: t('FrontsSection.Study_Groups'),
      description: t('FrontsSection.Study_Groups_Description'),
    },
    {
      image: "https://via.placeholder.com/250x300",
      title: t('FrontsSection.Projects'),
      description: t('FrontsSection.Projects_Description'),
    },
    {
      image: "https://via.placeholder.com/250x300",
      title: t('FrontsSection.Events'),
      description: t('FrontsSection.Events_Description'),
    },
    {
      image: "https://via.placeholder.com/250x300",
      title: t('FrontsSection.Marketing'),
      description: t('FrontsSection.Marketing_Description'),
    },
    {
      image: "https://via.placeholder.com/250x300",
      title: t('FrontsSection.Secretariat'),
      description: t('FrontsSection.Secretariat_Description'),
    },
    {
      image: "https://via.placeholder.com/250x300",
      title: t('FrontsSection.Teaching'),
      description: t('FrontsSection.Teaching_Description'),
    },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen py-10">
      <div >
        <h1>{t("Header.Fronts")}</h1>
        <br />
        <p className="leading-loose">
          {t("FrontsSection.Fronts_Description")}
        </p>
        <br />
        <p className="leading-loose">
          {t("FrontsSection.Fronts_Description_2")}
        </p>
        <br />
      </div>

      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20">
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

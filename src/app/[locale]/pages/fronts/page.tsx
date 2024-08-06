import React from 'react';
import { useTranslations } from 'next-intl';
import CardComponent from '../../components/Card';

export default function Fronts() {
  const t = useTranslations();

  const cardsData = [
    {
      image: "https://via.placeholder.com/250x300",
      title: t('Study_Groups'),
      description: t('Study_Groups_Description'),
    },
    {
      image: "https://via.placeholder.com/250x300",
      title: t('Projects'),
      description: t('Projects_Description'),
    },
    {
      image: "https://via.placeholder.com/250x300",
      title: t('Events'),
      description: t('Events_Description'),
    },
    {
      image: "https://via.placeholder.com/250x300",
      title: t('Marketing'),
      description: t('Marketing_Description'),
    },
    {
      image: "https://via.placeholder.com/250x300",
      title: t('Secretariat'),
      description: t('Secretariat_Description'),
    },
    {
      image: "https://via.placeholder.com/250x300",
      title: t('Teaching'),
      description: t('Teaching_Description'),
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen">
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

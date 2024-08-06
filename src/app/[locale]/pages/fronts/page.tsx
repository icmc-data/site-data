import React from 'react';
import { useTranslations } from 'next-intl';
import CardComponent from '../../components/Card';

export default function Fronts() {
  const t = useTranslations();

  return (
    <div>
      <CardComponent 
        title={t('Study_Groups')}
        description={t('Study_Groups_Description')}
      />
    </div>
  );
}

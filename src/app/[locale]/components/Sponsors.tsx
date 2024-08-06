"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from 'next-intl';

interface Sponsor {
  logoUrl: string;
}

interface SponsorsProps {
  sponsors?: Sponsor[];
}

const Sponsors: React.FC<SponsorsProps> = ({ sponsors = [] }) => {
  const { resolvedTheme } = useTheme();
  const t = useTranslations('');
  const [sponsorImages, setSponsorImages] = useState<Sponsor[]>([]);

  useEffect(() => {
    if (sponsors && sponsors.length > 0) {
      const updatedSponsors = sponsors.map((sponsor) => {
        const logoUrl =
          resolvedTheme === "light"
            ? sponsor.logoUrl.replace(".png", "-white.png")
            : sponsor.logoUrl;
        return { ...sponsor, logoUrl };
      });
      setSponsorImages(updatedSponsors);
    }
  }, [resolvedTheme, sponsors]);

  return (
    <div>
      <h2 className="text-center">{t("Our_Sponsors")}</h2>
      <p className="text-center">{t("Sponsors_Description")}</p>
      <br />
      <div className="flex flex-wrap justify-center">
        {sponsorImages.map((sponsor, index) => (
          <div key={index} className="m-8"> 
            <img
              src={sponsor.logoUrl}
              alt={`Sponsor ${index + 1}`}
              className="max-w-xs max-h-32"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsors;

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
      <h2 className="text-center">{t("InitialPage.Our_Sponsors")}</h2>
      <p className="text-center">{t("InitialPage.Sponsors_Description")}</p>
      <br />
      <div className="flex flex-wrap justify-center">
        {sponsorImages.map((sponsor, index) => (
          <div key={index} className="flex justify-center w-full md:w-auto m-4"> 
            <img
              src={sponsor.logoUrl}
              alt={`Sponsor ${index + 1}`}
              className="w-full max-w-[170px] md:max-w-[180px] lg:max-w-[240px] h-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsors;

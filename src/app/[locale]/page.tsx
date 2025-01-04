"use client";
import { useTranslations } from "next-intl";
import Button from "./components/Button";
import Sponsors from "./components/Sponsors";
import ImageWithModal from "./components/ImageWithModal";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsSmallScreen(width <= 1200);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const sponsorsData = [
    { logoUrl: "/images/icmc-logo.png" },
    { logoUrl: "/images/brains.png" },
    { logoUrl: "/images/centerIA.png" },
  ];

  const t = useTranslations("");
  return (
    <div className="mt-32">
      <section
        className={`flex ${
          isSmallScreen ? "flex-col-reverse" : "flex-row"
        } relative py-0`}
      >
        <div
          className={`flex flex-col items-center ${
            isSmallScreen ? "text-center" : "md:flex-row text-left"
          } space-x-0 md:space-x-4`}
        >
          <div>
           {isSmallScreen ? <br /> : ""} 
            <h1 className="text-4xl font-bold">DATA</h1>
            <p className="leading-loose text-base md:text-lg mt-4">
              {t("HeroSection.Extension_Group_of")}
              <a
                href="https://www.icmc.usp.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                &nbsp; ICMC-USP &nbsp;
              </a>
              {t("HeroSection.Small_Description-Data")}
            </p>
            <br />
            <Button variant="secondary" size="medium" pageLink="/pages/about">
              {t("HeroSection.Learn_More")}
            </Button>
          </div>
        </div>
        <div
          className={`flex justify-center ${
            isSmallScreen ? "mt-6" : "md:ml-10"
          }`}
        >
      
          <ImageWithModal
            src="/images/members.jpeg"
            alt={t("AboutSection.Members_Image_Alt")}
            className={`${
              isSmallScreen
                ? "w-full max-w-screen-sm rounded-md shadow-lg object-cover" // Para telas menores
                : "max-w-screen-sm rounded-md shadow-lg object-cover" // Para telas maiores
            }`}
            

            modalClassName="max-w-5xl"
          />
         
        </div>
      </section>

      {/* Seção de patrocinadores */}
      <section className="mt-10">
        <Sponsors sponsors={sponsorsData} />
      </section>
    </div>
  );
}

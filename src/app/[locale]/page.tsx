"use client";
import { useTranslations } from "next-intl";
import Button from "./components/Button";
import LogoIcon from "../icons/logo";
import LottieEye from "./components/LottieEye";
import Sponsors from "./components/Sponsors"; 
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsSmallScreen(width <= 1200);
      setIsMobile(width <= 880);
    };

    // Definindo o estado inicial e adicionando o listener
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup do listener ao desmontar o componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const sponsorsData = [
    { logoUrl: "/images/icmc-logo.png" },
    { logoUrl: "/images/brains.png" },
    { logoUrl: "/images/centerIA.png" },
    
    // adicione mais patrocinadores conforme necessário
  ];
  
  const t = useTranslations("");
  return (
    <div className="mt-24">
      <section className={`flex ${isSmallScreen ? 'flex-col-reverse' : 'flex-row'} relative py-0`}>
        <div className={`flex flex-col items-center ${isSmallScreen ? 'text-center' : 'md:flex-row text-left'} space-x-0 md:space-x-4`}>
          <div>
            <h1 className="text-3xl md:text-5xl">DATA</h1>
            <p className="leading-loose text-base md:text-lg">
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
            <Button variant="secondary" size="medium" styleType="outline" pageLink="/pages/about">
              {t("HeroSection.Learn_More")}
            </Button>
          </div>
        </div>
        <div className={`flex justify-center -mt-[100px] -mb-[50px] ${isSmallScreen ? '' : 'md:-mt-30 ml-44'} float-animation`}>
          <LottieEye 
            height={isSmallScreen ? 300 : 500} 
            width={isSmallScreen ? 300 : 500}
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

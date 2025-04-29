// src/pages/EvertsLOGRegisterFlashCard.tsx
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import i18n from "@/i18n";

const EvertsLOGRegisterFlashCard: React.FC = () => {
  const { t } = useTranslation("events");
  const { theme } = useTheme();
  const widgetContainerRef = useRef<HTMLDivElement>(null);
  const language = i18n.language.split("-")[0];

  const getFormUrl = () => {
    if (language === "pt") {
      return theme === "dark"
        ? "https://tally.so/r/w2Rxvp?transparentBackground=1"
        : "https://tally.so/r/m6VQjY?transparentBackground=1";
    } else {
      return theme === "dark"
        ? "https://tally.so/r/3x6Nar?transparentBackground=1"
        : "https://tally.so/r/woxVdV?transparentBackground=1";
    }
  };

  useEffect(() => {
    const container = widgetContainerRef.current!;
    container.innerHTML = "";
    document
      .querySelectorAll("script[src='https://tally.so/widgets/embed.js']")
      .forEach(s => s.remove());

    const iframe = document.createElement("iframe");
    iframe.setAttribute("data-tally-src", getFormUrl());
    iframe.setAttribute("title", "Inscrições - LoG 2025 São Carlos");
    iframe.setAttribute("scrolling", "yes");
    iframe.setAttribute("allowFullScreen", "");
    iframe.className = "absolute inset-0 w-full h-full border-0";

    container.appendChild(iframe);

    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document
        .querySelectorAll("script[src='https://tally.so/widgets/embed.js']")
        .forEach(s => s.remove());
    };
  }, [theme]);

  return (
    <>
      <ParticlesBackground />
      <main className="flex flex-col h-screen pt-[70px]">
        <div className="p-4">
          <Link to="/events">
            <Button variant="ghost" className="flex items-center gap-2">
              <ChevronLeft size={16} />
              {t("udl.actions.backToEvent")}
            </Button>
          </Link>
        </div>
        <div
          id="tally-widget-container"
          ref={widgetContainerRef}
          className="relative w-full flex-1"
        />
      </main>
    </>
  );
};

export default EvertsLOGRegisterFlashCard;

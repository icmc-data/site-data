import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const EvertsLOGRegister = () => {
  const { t, i18n } = useTranslation("events");
  const { theme } = useTheme();
  const language = i18n.language;
  const widgetContainerRef = useRef(null);

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
    if (widgetContainerRef.current) {
      widgetContainerRef.current.innerHTML = "";
    }
    
    const existingScript = document.querySelector("script[src='https://tally.so/widgets/embed.js']");
    if (existingScript) {
      existingScript.parentNode.removeChild(existingScript);
    }

    const iframe = document.createElement("iframe");
    iframe.setAttribute("data-tally-src", getFormUrl());
    iframe.setAttribute("scrolling", "no");
    iframe.setAttribute("title", "Inscrições - LoG 2025 São Carlos");
    iframe.setAttribute("allowFullScreen", "");
    iframe.className = "w-full border-0";
    iframe.style.height = "2500px";

    if (widgetContainerRef.current) {
      widgetContainerRef.current.appendChild(iframe);
    }

    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const scriptTag = document.querySelector("script[src='https://tally.so/widgets/embed.js']");
      if (scriptTag) {
        scriptTag.parentNode.removeChild(scriptTag);
      }
    };
  }, [theme, language]);

  return (
    <>
      <ParticlesBackground />
      <main className="min-h-screen pt-[70px]">
        <div className="p-4">
          <Link to="/events">
            <Button variant="ghost" className="flex items-center gap-2">
              <ChevronLeft size={16} />
              {t("udl.actions.backToEvent")}
            </Button>
          </Link>
        </div>
        <div className="w-full" ref={widgetContainerRef} style={{ overflow: "hidden" }} />
      </main>
    </>
  );
};

export default EvertsLOGRegister;
import React, { useEffect } from "react";
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

  useEffect(() => {
    // Reinicializa o script do Tally sempre que o tema ou idioma muda
    const existingScript = document.querySelector(
      "script[src='https://tally.so/widgets/embed.js']"
    );
    if (existingScript) {
      existingScript.parentNode.removeChild(existingScript);
    }
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [theme, language]);

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

  return (
    <>
      <ParticlesBackground />
      <main className="h-screen overflow-auto pt-20">
        <div className="p-4">
          <Link to="/events">
            <Button variant="ghost" className="flex items-center gap-2">
              <ChevronLeft size={16} />
              {t("udl.actions.backToEvent")}
            </Button>
          </Link>
        </div>
        <div className="w-full h-full">
          <iframe
            key={`${theme}-${language}`} // Re-renderiza quando tema ou idioma mudarem
            data-tally-src={getFormUrl()}
            title="Inscrições - LoG 2025 São Carlos"
            className="w-full h-full border-0"
            allowFullScreen
          ></iframe>
        </div>
      </main>
    </>
  );
};

export default EvertsLOGRegister;

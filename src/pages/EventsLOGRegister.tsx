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
    // Adiciona o script do Tally apenas se ele ainda não estiver presente
    if (!document.querySelector("script[src='https://tally.so/widgets/embed.js']")) {
      const script = document.createElement("script");
      script.src = "https://tally.so/widgets/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

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
      <main className="min-h-screen">
        {/* Cabeçalho do site */}
        <div className="p-4">
          <Link to="/events">
            <Button variant="ghost" className="flex items-center gap-2">
              <ChevronLeft size={16} />
              {t("udl.actions.backToEvent")}
            </Button>
          </Link>
        </div>
        {/* O iframe é colocado diretamente na página, sem contêiner com overflow */}
        <div className="w-full">
          <iframe
            key={`${theme}-${language}`} // Re-renderiza quando tema ou idioma mudam
            data-tally-src={getFormUrl()}
            title="Inscrições - LoG 2025 São Carlos"
            className="w-full border-0"
            allowFullScreen
          ></iframe>
        </div>
      </main>
    </>
  );
};

export default EvertsLOGRegister;
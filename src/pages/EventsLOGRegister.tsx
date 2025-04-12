import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const EvertsLOGRegister = () => {
  const { t } = useTranslation("events");
  const { theme } = useTheme();

  // Recarrega a página somente uma vez quando o tema muda
  useEffect(() => {
    // Verifica se a flag "themeReloaded" não está definida
    if (!sessionStorage.getItem("themeReloaded")) {
      sessionStorage.setItem("themeReloaded", "true");
      window.location.reload();
    } else {
      // Remove a flag após o recarregamento para permitir futuras mudanças
      sessionStorage.removeItem("themeReloaded");
    }
  }, [theme]);

  // Carrega o script do Tally somente uma vez
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <ParticlesBackground />
      <main className="h-screen overflow-hidden pt-20">
        <div className="relative w-full h-full">
          <div className="absolute top-6 left-6 z-10">
            <Link to="/events">
              <Button variant="ghost" className="flex items-center gap-2">
                <ChevronLeft size={16} />
                {t("udl.actions.backToEvent")}
              </Button>
            </Link>
          </div>

          <iframe
            data-tally-src={
              theme === "dark"
                ? "https://tally.so/r/3x6Nar?transparentBackground=1"
                : "https://tally.so/r/m6VQjY?transparentBackground=1"
            }
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
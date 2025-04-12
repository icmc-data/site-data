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

  useEffect(() => {
    // Procura e remove qualquer script do Tally já existente
    const existingScript = document.querySelector("script[src='https://tally.so/widgets/embed.js']");
    if (existingScript) {
      existingScript.parentNode.removeChild(existingScript);
    }
    // Cria e adiciona o script do Tally novamente
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [theme]); // Esse efeito será executado sempre que o tema mudar

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
            // Ao alterar o tema, essa key muda, forçando a remontagem do iframe
            key={theme}
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
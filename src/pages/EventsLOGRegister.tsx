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
  // Ref para o container onde o widget será injetado
  const widgetContainerRef = useRef(null);

  // Define a URL do formulário com base no idioma e tema
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
    // Limpa o container de widget, removendo possíveis iframes antigos
    if (widgetContainerRef.current) {
      widgetContainerRef.current.innerHTML = "";
    }

    // Se houver um script do Tally já carregado, remove-o para forçar a re-inicialização
    const existingScript = document.querySelector("script[src='https://tally.so/widgets/embed.js']");
    if (existingScript) {
      existingScript.parentNode.removeChild(existingScript);
    }

    // Cria o novo iframe para o widget do Tally
    const iframe = document.createElement("iframe");
    iframe.setAttribute("data-tally-src", getFormUrl());
    iframe.setAttribute("title", "Inscrições - LoG 2025 São Carlos");
    iframe.setAttribute("allowFullScreen", "");
    iframe.className = "w-full border-0";
    iframe.style.height = "100%";

    // Insere o iframe no container
    if (widgetContainerRef.current) {
      widgetContainerRef.current.appendChild(iframe);
    }

    // Re-adiciona o script do Tally para que ele processe o iframe inserido
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Opcional: limpeza para remover o script ao desmontar o componente
    return () => {
      const scriptTag = document.querySelector("script[src='https://tally.so/widgets/embed.js']");
      if (scriptTag) {
        scriptTag.parentNode.removeChild(scriptTag);
      }
    };
  }, [theme, language]); // Toda vez que o tema ou idioma mudar, o widget será recriado

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
        {/* Container para o widget com altura definida para ocupar o espaço restante da tela */}
        <div
          className="w-full"
          style={{ height: "calc(100vh - 64px)" }} // Ajuste "64px" conforme a altura real do seu cabeçalho
          ref={widgetContainerRef}
        />
      </main>
    </>
  );
};

export default EvertsLOGRegister;
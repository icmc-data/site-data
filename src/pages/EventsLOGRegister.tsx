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

    // Remove o script do Tally, se já estiver carregado, para forçar a reinicialização
    const existingScript = document.querySelector("script[src='https://tally.so/widgets/embed.js']");
    if (existingScript) {
      existingScript.parentNode.removeChild(existingScript);
    }

    // Cria o novo iframe para o widget do Tally
    const iframe = document.createElement("iframe");
    iframe.setAttribute("data-tally-src", getFormUrl());
    // Comentamos o auto redimensionamento para usar a altura fixa
    // iframe.setAttribute("data-tally-auto-resize", "");
    // Desabilita o scroll interno do iframe
    iframe.setAttribute("scrolling", "no");
    iframe.setAttribute("title", "Inscrições - LoG 2025 São Carlos");
    iframe.setAttribute("allowFullScreen", "");
    iframe.className = "w-full border-0";
    // Define uma altura fixa grande para exibir todo o conteúdo do formulário
    iframe.style.height = "1500px";

    // Insere o iframe no container
    if (widgetContainerRef.current) {
      widgetContainerRef.current.appendChild(iframe);
    }

    // Re-adiciona o script do Tally para que ele processe o iframe inserido
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Limpeza: remove o script ao desmontar o componente
    return () => {
      const scriptTag = document.querySelector("script[src='https://tally.so/widgets/embed.js']");
      if (scriptTag) {
        scriptTag.parentNode.removeChild(scriptTag);
      }
    };
  }, [theme, language]); // Recria o widget sempre que o tema ou idioma mudar

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
        {/* Container para o widget: removido qualquer altura fixa para permitir o ajuste do iframe */}
        <div className="w-full" ref={widgetContainerRef} style={{ overflow: "hidden" }} />
      </main>
    </>
  );
};

export default EvertsLOGRegister;
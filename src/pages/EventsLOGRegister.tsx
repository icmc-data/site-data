import React, { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

const EvertsLOGRegister = () => {
  const { theme } = useTheme();
  const [iframeKey, setIframeKey] = useState(0);

  // URLs para cada tema (ajuste conforme necessário)
  const formUrlLight = "https://tally.so/embed/m6VQjY?transparentBackground=1";
  const formUrlDark  = "https://tally.so/embed/3x6Nar?transparentBackground=1";

  useEffect(() => {
    // Remove o script existente, caso haja
    const existingScript = document.querySelector(
      'script[src="https://tally.so/widgets/embed.js"]'
    );
    if (existingScript) {
      existingScript.remove();
    }

    // Função para carregar o script do Tally de forma assíncrona
    const loadScript = () =>
      new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://tally.so/widgets/embed.js";
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Erro ao carregar o script do Tally"));
        document.body.appendChild(script);
      });

    loadScript()
      .then(() => {
        // Após o script carregar, forçamos a re-renderização do iframe
        setIframeKey((prevKey) => prevKey + 1);
      })
      .catch((err) => console.error(err));

    // Cleanup: remove o script no unmount ou antes de reinjetar
    return () => {
      const script = document.querySelector('script[src="https://tally.so/widgets/embed.js"]');
      if (script) {
        script.remove();
      }
    };
  }, [theme]);

  // Seleciona a URL com base no tema atual
  const tallyFormUrl = theme === "dark" ? formUrlDark : formUrlLight;

  return (
    <iframe
      key={iframeKey} // A key atualiza para forçar a recriação do iframe
      data-tally-src={tallyFormUrl}
      loading="lazy"
      width="100%"
      height="600"
      frameBorder="0"
      marginHeight="0"
      marginWidth="0"
      title="Formulário de Registro"
    ></iframe>
  );
};

export default EvertsLOGRegister;
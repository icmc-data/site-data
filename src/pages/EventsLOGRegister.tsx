import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';  // Exemplo de import do hook de tema (ajuste conforme seu contexto)

function EvertsLOGRegister() {
  const { theme } = useTheme();  // Obtém o tema atual (por exemplo, 'light' ou 'dark')
  const [iframeKey, setIframeKey] = useState(0);

  // URLs do formulário Tally para cada tema
  const formUrlLight = "https://tally.so/embed/FORM_ID_LIGHT?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1";
  const formUrlDark  = "https://tally.so/embed/FORM_ID_DARK?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1";

  useEffect(() => {
    // 1. Remover o script do Tally existente, se houver
    const existingScript = document.querySelector('script[src="https://tally.so/widgets/embed.js"]');
    if (existingScript) {
      existingScript.remove();
    }

    // 2. Re-injetar o script do Tally com document.createElement
    const script = document.createElement('script');
    script.src = "https://tally.so/widgets/embed.js";
    script.id = "tally-widget";
    script.async = true;
    document.body.appendChild(script);

    // 3. Atualizar a key do iframe para forçar re-renderização ao mudar de tema
    setIframeKey(prevKey => prevKey + 1);
  }, [theme]);

  // Seleciona a URL do formulário de acordo com o tema atual
  const tallyFormUrl = theme === 'dark' ? formUrlDark : formUrlLight;

  return (
    <div>
      <iframe
        key={iframeKey}
        data-tally-src={tallyFormUrl}
        loading="lazy"
        width="100%"
        height="600"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        title="Formulário de Registro"
      ></iframe>
    </div>
  );
}

export default EvertsLOGRegister;
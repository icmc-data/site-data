import React, { useEffect, useState } from "react";

interface AboutEventProps {
  locale: string; // Para determinar o idioma
}

const AboutEvent: React.FC<AboutEventProps> = ({ locale }) => {
  const [aboutData, setAboutData] = useState<{
    title: string;
    content: string;
  } | null>(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      const response = await fetch(`/${locale}/udlAboutEvent.json`);
      const data = await response.json();
      setAboutData(data);
    };

    fetchAboutData();
  }, [locale]);

  if (!aboutData) {
    return <div>Loading...</div>; // Carregando enquanto os dados são buscados
  }

  return (
    <div className="about-event">
      <h2>{aboutData.title}</h2>
      <div
        style={{ paddingTop: "20px" }}
        dangerouslySetInnerHTML={{ __html: aboutData.content }}
      />
    </div>
  );
};

export default AboutEvent;

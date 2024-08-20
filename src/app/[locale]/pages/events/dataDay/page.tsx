"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faYoutube,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import Hero from "../../../components/Hero";

export default function DataDay() {
  const t = useTranslations("");

  const handleEmailClick = () => {
    navigator.clipboard.writeText("data.icmc@usp.com");
    alert("Email copiado para sua área de transferência :)");
  };

  const buttonStyle = {
    width: "300px", // Largura uniforme para todos os botões
    height: "100px", // Altura uniforme para todos os botões
    boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.4)",
    fontSize: "28px",
  };

  const iconStyle = {
    fontSize: "40px", // Tamanho uniforme para todos os ícones
    marginRight: "16px", // Espaçamento uniforme entre ícone e texto
  };

  return (
    <div className="px-32 py-40 text-center mt-24">
      <h1 className="text-3xl mb-16">
        Faça contato e confira nossos conteúdos!
      </h1>
      <div className="flex justify-center space-x-20">
        <button
          onClick={handleEmailClick}
          className="px-12 py-8 bg-white text-black rounded-3xl shadow-lg flex items-center justify-center"
          style={buttonStyle}
        >
          <FontAwesomeIcon icon={faEnvelope} style={iconStyle} />
          E-mail
        </button>
        <button
          onClick={() =>
            window.open("https://www.youtube.com/c/DataICMC", "_blank")
          }
          className="px-12 py-8 bg-white text-black rounded-3xl shadow-lg flex items-center justify-center"
          style={buttonStyle}
        >
          <FontAwesomeIcon icon={faYoutube} style={iconStyle} />
          YouTube
        </button>
        <button
          onClick={() =>
            window.open("https://instagram.com/data.icmc/", "_blank")
          }
          className="px-12 py-8 bg-white text-black rounded-3xl shadow-lg flex items-center justify-center"
          style={buttonStyle}
        >
          <FontAwesomeIcon icon={faInstagram} style={iconStyle} />
          Instagram
        </button>
        <button
          onClick={() =>
            window.open(
              "https://www.linkedin.com/school/data-icmc/mycompany/",
              "_blank"
            )
          }
          className="px-12 py-8 bg-white text-black rounded-3xl shadow-lg flex items-center justify-center"
          style={buttonStyle}
        >
          <FontAwesomeIcon icon={faLinkedin} style={iconStyle} />
          LinkedIn
        </button>
      </div>
    </div>
  );
}

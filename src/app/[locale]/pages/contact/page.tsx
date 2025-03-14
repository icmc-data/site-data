"use client";
import { useTranslations } from "next-intl";
import { AiOutlineMail, AiOutlineYoutube, AiOutlineInstagram } from "react-icons/ai";
import { PiLinkedinLogo } from "react-icons/pi";
import { Footer } from "../../components/Footer";

export default function Contact() {
  const t = useTranslations("");

  const handleEmailClick = () => {
    navigator.clipboard.writeText("data.icmc@usp.com");
    alert("Email copiado para sua área de transferência :)");
  };

  const buttonStyle = {
    fontSize: "20px", // Tamanho do texto para mobile
    backgroundColor: "var(--background-secondary)", // Usando variável CSS
    color: "var(--primary)", // Usando variável CSS para o texto
  };

  const iconStyle = {
    fontSize: "28px", // Tamanho do ícone para mobile
    marginRight: "12px",
    color: "var(--primary)", // Usando variável CSS para o ícone
  };

  return (
    <div className="px-4 py-20 md:px-32 md:py-40 text-center mt-24">
      <p className="text-2xl md:text-3xl mb-10 md:mb-16">
        {t("Contact_Description")}
      </p>
      <div
        className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-10"
        style={{ marginBottom: "50px" }} // Adiciona espaço inferior antes do footer
      >
        <button
          onClick={handleEmailClick}
          className="w-full md:w-auto px-6 py-4 md:px-8 md:py-6 rounded-3xl  flex items-center justify-center whitespace-nowrap"
          style={buttonStyle}
        >
          <AiOutlineMail style={iconStyle} />
          E-mail
        </button>
        <button
          onClick={() =>
            window.open("https://www.youtube.com/c/DataICMC", "_blank")
          }
          className="w-full md:w-auto px-6 py-4 md:px-8 md:py-6 rounded-3xl flex items-center justify-center whitespace-nowrap"
          style={buttonStyle}
        >
          <AiOutlineYoutube style={iconStyle} />
          YouTube
        </button>
        <button
          onClick={() =>
            window.open("https://instagram.com/data.icmc/", "_blank")
          }
          className="w-full md:w-auto px-6 py-4 md:px-8 md:py-6 rounded-3xl flex items-center justify-center whitespace-nowrap"
          style={buttonStyle}
        >
          <AiOutlineInstagram style={iconStyle} />
          Instagram
        </button>
        <button
          onClick={() =>
            window.open(
              "https://www.linkedin.com/school/data-icmc/mycompany/",
              "_blank"
            )
          }
          className="w-full md:w-auto px-6 py-4 md:px-8 md:py-6 rounded-3xl flex items-center justify-center whitespace-nowrap"
          style={buttonStyle}
        >
          <PiLinkedinLogo style={iconStyle} />
          LinkedIn
        </button>
      </div>
    </div>
  );
}

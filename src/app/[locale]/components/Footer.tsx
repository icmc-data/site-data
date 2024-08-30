import { FaFacebook, FaYoutube, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useTranslations } from "next-intl";

export const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <footer
      style={{
        backgroundColor: "#4A4A4A",
        color: "#FFFFFF",
        padding: "30px 20px",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "16px",
        position: "relative",
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <div style={{ textAlign: "left" }}>
        <p style={{ marginBottom: "10px" }}>{t("Contact_Info")}</p>{" "}
        <p style={{ marginBottom: "5px" }}>Assuntos gerais: data.icmc@usp.br</p>
      </div>

      <div style={{ textAlign: "center" }}>
        <p>© Data ICMC 2024. {t("All_Rights_Reserved")}</p>{" "}
      </div>

      <div style={{ textAlign: "right" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <a
            href="https://www.youtube.com/c/DataICMC"
            style={{ marginRight: "25px", color: "#FFFFFF" }}
            aria-label="YouTube"
          >
            <FaYoutube size={25} />
          </a>
          <a
            href="https://www.instagram.com/data.icmc/"
            style={{ marginRight: "25px", color: "#FFFFFF" }}
            aria-label="Instagram"
          >
            <FaInstagram size={25} />
          </a>
          <a
            href="https://www.linkedin.com/school/data-icmc/"
            style={{ marginRight: "25px", color: "#FFFFFF" }}
            aria-label="LinkedIn"
          >
            <FaLinkedin size={25} />
          </a>
        </div>
      </div>
    </footer>
  );
};

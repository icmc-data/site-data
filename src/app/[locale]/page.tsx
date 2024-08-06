import { useTranslations } from "next-intl";
import Button from "./components/Button";
import Link from "next/link";
import LogoIcon from "../icons/logo";
import LottieEye from "./components/LottieEye";
import Sponsors from "./components/Sponsors"; // Certifique-se de importar o componente Sponsors

export default function DashboardPage() {
  const sponsorsData = [
    { logoUrl: "/images/icmc-logo.png" },
    { logoUrl: "/images/brains.png" },
    { logoUrl: "/images/centerIA.png" },
    
    // adicione mais patrocinadores conforme necessário
  ];
  
  const t = useTranslations("");
  return (
    <div>
      <section className="flex relative py-0">
        <div className="flex items-center space-x-4">
          <div>
            <h1>DATA</h1>
            <p className="leading-loose">
              {t("Extension_Group_of")}
              <a
                href="https://www.icmc.usp.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                &nbsp; ICMC-USP &nbsp;
              </a>
              {t("Small_Description-Data")}
            </p>
            <br />
            <Button variant="secondary" size="medium" styleType="outline">
              {t("Learn_More")}
            </Button>
          </div>
        </div>
        <div className="-mt-30 ml-44 float-animation">
          <LottieEye height={500} width={550} />
        </div>
      </section>

      {/* Seção de patrocinadores */}
      <section className="mt-10">
        <Sponsors sponsors={sponsorsData} />
      </section>
    </div>
  );
}

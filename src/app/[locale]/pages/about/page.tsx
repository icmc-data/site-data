import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("");
  return (
    <div className="py-24 text-2xl">
      <section className="flex relative py-0">
        <div className="flex items-center">
          <div>
            <h1>DATA</h1>
            <br />
            <br />

            <h2>{t("About")}</h2>
            <p className="leading-loose">
              {t("About_Description_1")}
              <a
                href="https://www.icmc.usp.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                {t("ICMC")}
              </a>
              {t("About_Description_1_2")}
              <a
                href="https://www.usp.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                {t("USP")}
              </a>
              {t("About_Description_1_3")}
            </p>
            <br />
            <p className="leading-loose">
              {t("About_Description_2")}
            </p>
            <br />
            <h2>{t("Mission")}</h2>
            <p className="leading-loose">
              {t("Mission_Description")}
            </p>
            <br />
            <h2>{t("Impact_And_Relevance")}</h2>
            <p className="leading-loose">
              {t("Impact_And_Relevance_Description")}
            </p>
            <br />
            <h2>{t("Project_Organization")}</h2>
            <p className="leading-loose">
              {t("Project_Organization_Description")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

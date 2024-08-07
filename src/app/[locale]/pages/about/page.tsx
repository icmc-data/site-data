import { useTranslations } from "next-intl";
import OrganizingCommittee from "../../components/OrganizingCommittee";
import people from "../../../../../data/people.json";

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

            <h2>{t("Header.About")}</h2>
            <p className="leading-loose">
              {t("AboutSection.About_Description_1")}
              <a
                href="https://www.icmc.usp.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                {t("AboutSection.ICMC")}
              </a>
              {t("AboutSection.About_Description_1_2")}
              <a
                href="https://www.usp.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                {t("AboutSection.USP")}
              </a>
              {t("AboutSection.About_Description_1_3")}
            </p>
            <br />
            <p className="leading-loose">
              {t("AboutSection.About_Description_2")}
            </p>
            <br />
            <h2>{t("AboutSection.Mission")}</h2>
            <p className="leading-loose">
              {t("AboutSection.Mission_Description")}
            </p>
            <br />
            <h2>{t("AboutSection.Impact_And_Relevance")}</h2>
            <p className="leading-loose">
              {t("AboutSection.Impact_And_Relevance_Description")}
            </p>
            <br />
            <h2>{t("AboutSection.Project_Organization")}</h2>
            <p className="leading-loose">
              {t("AboutSection.Project_Organization_Description")}
            </p>
          </div>
        </div>
      </section>
      <br />
      <OrganizingCommittee members={people}/>
    </div>
  );
}

import { useTranslations } from "next-intl";
import OrganizingCommittee from "../../components/OrganizingCommittee";
import people from "../../../../../data/people.json";
import Photo from "../../components/Photo";

export default function About() {
  const t = useTranslations("");
  return (
    <div className="py-24 text-2xl">
      <h1>DATA</h1>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative py-0">
        <div className="lg:order-1 flex justify-start items-start lg:col-span-1">
          <Photo imgSrc="/images/estudos.jpeg" size={0.8} rotation={-5} description={t("Header.About") } />
        </div>
        <div className="lg:order-2 flex flex-col items-start justify-center lg:col-span-1">
          
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
        </div>
        <div className="lg:order-4 flex justify-end items-start lg:col-span-1">
          <Photo imgSrc="/images/estudos.jpeg" size={0.8} rotation={5} description={t("Header.About")} />
        </div>
        <div className="lg:order-3 flex flex-col items-start justify-center lg:col-span-1">
          <p className="leading-loose">
            {t("AboutSection.About_Description_2")}
          </p>
          <br />
          <h2>{t("AboutSection.Mission")}</h2>
          <p className="leading-loose">
            {t("AboutSection.Mission_Description")}
          </p>
        </div>
        <div className="lg:order-5 flex justify-start items-start lg:col-span-1">
          <Photo imgSrc="/images/estudos.jpeg" size={0.8} rotation={-5} description={t("Header.About")} />
        </div>
        <div className="lg:order-6 flex flex-col items-start justify-center lg:col-span-1">
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
      </section>
      <br />
      <OrganizingCommittee members={people} />
    </div>
  );
}

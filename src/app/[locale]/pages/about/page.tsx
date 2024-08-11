import { useTranslations } from "next-intl";
import OrganizingCommittee from "../../components/OrganizingCommittee";
import people from "../../../../../data/people.json";
import Photo from "../../components/Photo";

export default function About() {
  const t = useTranslations("");
  return (
    <div className="py-24 text-2xl">
      <h1>DATA</h1>

      <section>
        <br />
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
        <h2>{t("AboutSection.Project_Organization")}</h2>
        <p className="leading-loose">
          {t("AboutSection.Project_Organization_Description")}
        </p>
        <br />
        <OrganizingCommittee members={people} />
      </section>
      <section>
        <div className="flex flex-row items-center justify-center space-x-4">
          <div>
            <h2>{t("MissionT")}</h2>

            <p className="leading-loose">
              {t("AboutSection.MissionT_Description")}
            </p>
          </div>
          <Photo
            imgSrc="/images/estudos.jpeg"
            size={0.9}
            rotation={-5}
            description={t("Header.About")}
          />
        </div>
      </section>
      <section>
        <div>
          <h2>{t("AboutSection.Impact_And_Relevance")}</h2>
          <p className="leading-loose">
            {t("AboutSection.Impact_And_Relevance_Description")}
          </p>
          
        </div>
        <div className="flex flex-col items-center justify-center" style={{marginTop:"-100px"}}>
          <Photo
            imgSrc="/images/estudos.jpeg"
            size={0.65}
            description={t("Header.About")}
          />
        </div>
      </section>
      
    </div>
  );
}

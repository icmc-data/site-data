"use client";
import { useTranslations } from "next-intl";
import OrganizingCommittee from "../../components/OrganizingCommittee";
import Photo from "../../components/Photo";

// Import dos arquivos JSON
import peopleBR from "../../../../../data/br/people.json";
import peopleEN from "../../../../../data/en/people.json";

export default function About() {
  const t = useTranslations("");
  const locale = t("DONT_DELETE"); // determina o idioma atual da página

  // seleciona o arquivo JSON correto com base no idioma
  const people = locale === "br" ? peopleBR : peopleEN;

  return (
    <div className="py-8 md:py-16 text-xl md:text-2xl mt-20">
      <h1 className="text-primary dark:text-primary font-montserrat font-bold leading-tight text-3xl sm:text-5xl mb-2">
        DATA
      </h1>

      <section className="mb-8 md:mb-16">
        <p className="leading-relaxed px-4 md:px-0">
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

        <h2 className="text-center md:text-left mt-8 md:mt-16">
          {t("AboutSection.Project_Organization")}
        </h2>
        <p className="leading-relaxed px-4 md:px-0 mt-2 md:mt-4">
          {t("AboutSection.Project_Organization_Description")}
        </p>
        <div className="mt-8 md:mt-16">
          <OrganizingCommittee members={people} />
        </div>
      </section>

      <section className="">
        <div className="flex flex-col md:flex-row items-center justify-center md:space-x-4">
          <div className="text-center md:text-left">
            <h2 className="mb-2 md:mb-4">{t("AboutSection.MissionT")}</h2>
            <p className="leading-relaxed px-4 md:px-0">
              {t("AboutSection.MissionT_Description")}
            </p>
          </div>
        </div>
      </section>

      <br />

      <section className="">
        <div className="text-center md:text-left">
          <h2 className="mb-2 md:mb-4">
            {t("AboutSection.Impact_And_Relevance")}
          </h2>
          <p className="leading-relaxed px-4 md:px-0">
            {t("AboutSection.Impact_And_Relevance_Description")}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center mt-8 md:mt-16">
          {/* <Photo
            imgSrc="/images/estudos.jpeg"
            size={0.65}
            description={t("Header.About")}
          /> */}
        </div>
      </section>
    </div>
  );
} 

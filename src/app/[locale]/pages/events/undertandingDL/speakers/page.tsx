import React from "react";
import Image from "next/image";
import speakerData from "@/data/br/udl2024.json";
import speakerDataEn from "@/data/en/udl2024.json";
import { useTranslations } from "next-intl";

interface Speaker {
  name: string;
  photo: string;
  description: string;
}

const Speakers: React.FC = () => {
  const t = useTranslations("");
  const locale = t("DONT_DELETE");
  const eventData = locale === "br" ? speakerData : speakerDataEn;
  const allSpeakers = eventData.days.flatMap((day) =>
    day.lectures.map((lecture) => lecture.speaker)
  );

  return (
    <div className="container mx-auto px-4 py-8 mt-32">
     <h1 className="text-primary dark:text-primary font-montserrat font-bold leading-tight text-3xl sm:text-5xl mb-8">
        {t("Speakers_UDL")}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allSpeakers.map((speaker, index) => (
          <div
            key={index}
            className="rounded-lg shadow-lg p-4 flex flex-col items-center text-center bg-background text-primary dark:bg-background-secondary dark:text-secondary"
          >
            <Image
              src={speaker.photo}
              alt={speaker.name}
              width={150}
              height={150}
              className="rounded-full object-cover"
            />
            <h3 className="mt-4 font-semibold">{speaker.name}</h3>
            <p className="text-sm text-gray-600 dark:text-text-secondary">{speaker.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Speakers;

"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import speakerData from "@/data/br/udl2024.json";
import speakerDataEn from "@/data/en/udl2024.json";
import { useTranslations } from "next-intl";
import { FaChevronDown } from "react-icons/fa";

interface Speaker {
  name: string;
  photo: string;
  description: string;
}

const MAX_DESCRIPTION_LENGTH = 100;

const Speakers: React.FC = () => {
  const t = useTranslations("");
  const locale = t("DONT_DELETE");
  const eventData = locale === "br" ? speakerData : speakerDataEn;
  const allSpeakers = eventData.days.flatMap((day) =>
    day.lectures.map((lecture) => lecture.speaker)
  );

  const [expandedSpeaker, setExpandedSpeaker] = useState<number | null>(null);
  const [hoveredSpeaker, setHoveredSpeaker] = useState<number | null>(null);
  const [height, setHeight] = useState<number>(0);
  const descriptionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (descriptionRef.current) {
      setHeight(descriptionRef.current.scrollHeight);
    }
  }, [expandedSpeaker, hoveredSpeaker]);

  const handleExpandToggle = (index: number) => {
    if (expandedSpeaker === index) {
      setExpandedSpeaker(null);
    } else {
      setExpandedSpeaker(index);
      setHoveredSpeaker(null);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (expandedSpeaker === null) {
      setHoveredSpeaker(index);
    }
  };

  const handleMouseLeave = () => {
    if (expandedSpeaker === null) {
      setHoveredSpeaker(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-32">
      <h1 className="text-primary dark:text-primary font-montserrat font-bold leading-tight text-3xl sm:text-5xl mb-8">
        {t("Speakers_UDL")}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allSpeakers.map((speaker, index) => {
          const isExpanded = expandedSpeaker === index;
          const isHovered = hoveredSpeaker === index;
          const shouldExpand = isExpanded || isHovered;
          const truncatedDescription =
            speaker.description.length > MAX_DESCRIPTION_LENGTH
              ? `${speaker.description.substring(0, MAX_DESCRIPTION_LENGTH)}...`
              : speaker.description;

          return (
            <div
              key={index}
              className={`rounded-lg shadow-lg p-4 flex flex-col items-center text-center bg-background text-primary dark:bg-background-secondary dark:text-secondary cursor-pointer ${
                isExpanded ? "border-2 border-[var(--data-purple)]" : "border"
              }`}
              onClick={() => handleExpandToggle(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <Image
                src={speaker.photo || "/path/to/default/image.jpg"}
                alt={speaker.name}
                width={150}
                height={150}
                className="rounded-full object-cover"
              />
              <h3 className="mt-4 font-semibold">{speaker.name}</h3>
              <div
                ref={shouldExpand ? descriptionRef : null}
                style={{
                  height: shouldExpand ? `${height}px` : "4.5rem",
                  overflow: "hidden",
                  transition: "height 0.5s ease",
                }}
                className="w-full"
              >
                <p className="text-sm text-gray-600 dark:text-text-secondary transition-all duration-300 ease-in-out mt-2">
                  {shouldExpand ? speaker.description : truncatedDescription}
                </p>
              </div>
              <div className="mt-2 transform transition-transform duration-500 ease-in-out">
                <FaChevronDown
                  className={`text-primary dark:text-secondary ${
                    shouldExpand ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Speakers;

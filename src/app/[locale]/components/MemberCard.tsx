"use client";

import React from "react";
import { FaRegHandshake, FaBullhorn, FaCalendarAlt, FaUserTie, FaUsers, FaProjectDiagram, FaRegBuilding, FaChalkboardTeacher } from 'react-icons/fa';
import * as Tooltip from '@radix-ui/react-tooltip';
import { useTranslations } from 'next-intl';

interface Member {
  name: string;
  photo: string;
  description: string;
  categories: string[];
}

const categoryIcons: { [key: string]: JSX.Element } = {
  "Sponsorship": <FaRegHandshake />,
  "Marketing": <FaBullhorn />,
  "Events": <FaCalendarAlt />,
  "Coordinators": <FaUserTie />,
  "StudyGroup": <FaUsers />,
  "Projects": <FaProjectDiagram />,
  "Secretariat": <FaRegBuilding />,
  "Teaching": <FaChalkboardTeacher />,
};

const MemberCard: React.FC<Member> = ({ name, photo, description, categories }) => {
  const t = useTranslations('MemberCard');

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div className="m-4 text-center cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-105">
            <div className="flex justify-center">
              <img src={photo} alt={name} className="w-32 h-32 rounded-full" />
            </div>
            <h3 className="text-center mt-2 text-primary ">{name}</h3>
            <div className="flex justify-center mt-2 space-x-2">
              {categories.map((category, idx) => (
                <div key={idx} className="text-xl text-data-purple">
                  {categoryIcons[category]}
                </div>
              ))}
            </div>
          </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="bg-background-secondary text-primary text-description p-2 rounded">
            <p>{description}</p>
            <Tooltip.Arrow className="fill-background-secondary" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default MemberCard;

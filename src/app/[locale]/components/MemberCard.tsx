"use client";

import React, { useState } from "react";
import { FaBullhorn, FaCalendarAlt, FaUserTie, FaUsers, FaProjectDiagram, FaRegBuilding, FaChalkboardTeacher } from 'react-icons/fa';
import * as Tooltip from '@radix-ui/react-tooltip';
import { useTranslations } from 'next-intl';

interface Member {
  name: string;
  photo: string;
  description: string;
  categories: string[];
  special_role?: string;
}

const categoryIcons: { [key: string]: JSX.Element } = {
  "Marketing": <FaBullhorn />,
  "Events": <FaCalendarAlt />,
  "Coordinators": <FaUserTie />,
  "StudyGroup": <FaUsers />,
  "Projects": <FaProjectDiagram />,
  "Secretariat": <FaRegBuilding />,
  "Teaching": <FaChalkboardTeacher />,
};

const MemberCard: React.FC<Member> = ({ name, photo, description, categories, special_role }) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const t = useTranslations('MemberCard');

  const handleToggleTooltip = () => {
    setIsTooltipOpen(!isTooltipOpen);
  };

  return (
    <Tooltip.Provider>
      <Tooltip.Root open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
        <Tooltip.Trigger asChild>
          <div 
            className="m-4 text-center cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-105 w-72 max-w-full sm:w-60"
            onClick={handleToggleTooltip}
          >
            <div className="flex justify-center mb-4">
              <img src={photo} alt={name} className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover" />
            </div>
            <h3 className="text-center mt-4 text-primary font-inter text-sm sm:text-base">{name}</h3>
            {categories.includes("Coordinators") && special_role && (
              <p className="text-center mt-2 text-xs sm:text-sm text-gray-500">{special_role}</p>
            )}
            <div className="flex justify-center mt-4 space-x-4">
              {categories.map((category, idx) => (
                <div key={idx} className="text-base sm:text-lg text-data-purple">
                  {categoryIcons[category]}
                </div>
              ))}
            </div>
          </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content 
            className="bg-background-secondary text-primary text-xs p-4 rounded-lg shadow-lg relative tooltip-balloon z-50 max-w-xs sm:max-w-sm"
            sideOffset={5}
          >
            <p className="text-center">{description}</p>
            <Tooltip.Arrow className="fill-background-secondary" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default MemberCard;

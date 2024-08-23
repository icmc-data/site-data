"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import Button from "./Button";
import MemberCard from "./MemberCard";
import { FaBullhorn, FaCalendarAlt, FaUserTie, FaUsers, FaProjectDiagram, FaRegBuilding, FaChalkboardTeacher } from 'react-icons/fa';

interface Member {
  name: string;
  photo: string;
  description: string;
  categories: string[];
  special_role?: string[];
}

interface OrganizingCommitteeProps {
  members: Member[];
}

const categoryIcons: { [key: string]: JSX.Element } = {
  "All": <FaUsers />,
  "Marketing": <FaBullhorn />,
  "Events": <FaCalendarAlt />,
  "Coordinators": <FaUserTie />,
  "StudyGroup": <FaUsers />,
  "Projects": <FaProjectDiagram />,
  "Secretariat": <FaRegBuilding />,
  "Teaching": <FaChalkboardTeacher />,
};

const OrganizingCommittee: React.FC<OrganizingCommitteeProps> = ({ members }) => {
  const { resolvedTheme } = useTheme();
  const t = useTranslations('OrganizingCommittee');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ["All", "Marketing", "Events", "Coordinators", "StudyGroup", "Projects", "Secretariat", "Teaching"];

  const filterMembers = (category: string) => {
    return category === 'All'
      ? members
      : members.filter(member => member.categories.includes(category));
  };

  const filteredMembers = filterMembers(selectedCategory);

  return (
    <div>
<div className="overflow-x-auto whitespace-nowrap mb-4 scrollbar-hide">
  <div className="inline-flex justify-center space-x-4 min-w-full custom-padding-bottom">
    {categories.map((category) => (
      <Button
        key={category}
        onClick={() => setSelectedCategory(category)}
        variant={selectedCategory === category ? 'dataPurple' : 'secondary'}
        size="medium"
        rounded
        className="inline-block"
      >
        <span className="flex items-center space-x-2">
          {categoryIcons[category]}
          <span>{t(category)}</span>
        </span>
      </Button>
    ))}
  </div>
</div>


      <div className="flex flex-wrap justify-center">
        {filteredMembers.map((member, index) => (
          <div key={index} className="text-center">
            <MemberCard
              name={member.name}
              photo={member.photo}
              description={member.description}
              categories={member.categories}
            />
            {selectedCategory === "Coordinators" && member.special_role && (
              <div className="flex flex-col items-center mt-2 text-sm text-data-purple font-montserrat break-words max-w-xs mx-auto">
                <p>{member.special_role.join(' & ')}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizingCommittee;

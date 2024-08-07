"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import Button from "./Button";
import MemberCard from "./MemberCard";
import { FaRegHandshake, FaBullhorn, FaCalendarAlt, FaUserTie, FaUsers, FaProjectDiagram, FaRegBuilding, FaChalkboardTeacher } from 'react-icons/fa';

interface Member {
  name: string;
  photo: string;
  description: string;
  categories: string[];
}

interface OrganizingCommitteeProps {
  members: Member[];
}

const categoryIcons: { [key: string]: JSX.Element } = {
  "All": <FaUsers />,
  "Sponsorship": <FaRegHandshake />,
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
  const categories = ["All", "Sponsorship", "Marketing", "Events", "Coordinators", "StudyGroup", "Projects", "Secretariat", "Teaching"];

  const filterMembers = (category: string) => {
    return category === 'All'
      ? members
      : members.filter(member => member.categories.includes(category));
  };

  const filteredMembers = filterMembers(selectedCategory);

  return (
    <div>
      <div className="flex flex-wrap justify-center mb-4">
        {categories.map(category => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            variant={selectedCategory === category ? 'dataPurple' : 'secondary'}
            size="medium"
            rounded
            className="mx-2 my-2"
          >
            <span className="flex items-center space-x-2">
              {categoryIcons[category]}
              <span>{t(category)}</span>
            </span>
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center">
        {filteredMembers.map((member, index) => (
          <MemberCard
            key={index}
            name={member.name}
            photo={member.photo}
            description={member.description}
            categories={member.categories}
          />
        ))}
      </div>
    </div>
  );
};

export default OrganizingCommittee;
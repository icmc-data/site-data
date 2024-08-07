"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import Button from "./Button";
import MemberCard from "./MemberCard";

interface Member {
  name: string;
  photo: string;
  description: string;
  categories: string[];
}

interface OrganizingCommitteeProps {
  members: Member[];
}

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
            variant={selectedCategory === category ? 'primary' : 'secondary'}
            size="medium"
            rounded
            className="mx-2 my-2"
          >
            {t(category)}
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

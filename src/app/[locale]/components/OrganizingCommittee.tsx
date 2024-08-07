"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import Button from "./Button"; // ajuste o caminho conforme necessário
import MemberCard from "./MemberCard"; // ajuste o caminho conforme necessário

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
  const t = useTranslations('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const categories = ["Todos", "Patrocinio", "Marketing", "Eventos", "Coordenadores", "GrupoEstudos", "Projetos", "Secretaria", "Ensino"];

  const filterMembers = (category: string) => {
    return category === 'Todos'
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
            {category}
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

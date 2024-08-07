"use client";

import React from "react";
import { FaRegHandshake, FaBullhorn, FaCalendarAlt, FaUserTie, FaUsers, FaProjectDiagram, FaRegBuilding, FaChalkboardTeacher } from 'react-icons/fa';
import * as Tooltip from '@radix-ui/react-tooltip';

interface Member {
  name: string;
  photo: string;
  description: string;
  categories: string[];
}

const categoryIcons: { [key: string]: JSX.Element } = {
  "Patrocinio": <FaRegHandshake />,
  "Marketing": <FaBullhorn />,
  "Eventos": <FaCalendarAlt />,
  "Coordenadores": <FaUserTie />,
  "GrupoEstudos": <FaUsers />,
  "Projetos": <FaProjectDiagram />,
  "Secretaria": <FaRegBuilding />,
  "Ensino": <FaChalkboardTeacher />,
};

const MemberCard: React.FC<Member> = ({ name, photo, description, categories }) => {
  return (
    <div className="m-4 text-center">
      <div className="flex justify-center">
        <img src={photo} alt={name} className="w-32 h-32 rounded-full" />
      </div>
      <h3 className="text-center mt-2">{name}</h3>
      <p className="text-center">{description}</p>
      <div className="flex justify-center mt-2 space-x-2">
        {categories.map((category, idx) => (
          <Tooltip.Provider key={idx}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <div className="text-xl cursor-pointer">
                  {categoryIcons[category]}
                </div>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="bg-gray-800 text-white text-sm p-2 rounded">
                  {category}
                  <Tooltip.Arrow className="fill-gray-800" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        ))}
      </div>
    </div>
  );
};

export default MemberCard;

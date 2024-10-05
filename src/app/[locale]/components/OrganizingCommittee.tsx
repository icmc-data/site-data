"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import Button from "./Button";
import MemberCard from "./MemberCard";
import {
  FaBullhorn,
  FaCalendarAlt,
  FaUserTie,
  FaUsers,
  FaProjectDiagram,
  FaRegBuilding,
  FaChalkboardTeacher,
} from "react-icons/fa";

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
  All: <FaUsers />,
  Marketing: <FaBullhorn />,
  Events: <FaCalendarAlt />,
  Coordinators: <FaUserTie />,
  StudyGroup: <FaUsers />,
  Projects: <FaProjectDiagram />,
  Secretariat: <FaRegBuilding />,
  Teaching: <FaChalkboardTeacher />,
};

const OrganizingCommittee: React.FC<OrganizingCommitteeProps> = ({ members }) => {
  const { resolvedTheme } = useTheme();
  const t = useTranslations("OrganizingCommittee");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const categories = [
    "All",
    "Marketing",
    "Events",
    "Coordinators",
    "StudyGroup",
    "Projects",
    "Secretariat",
    "Teaching",
  ];
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1166);
    };

    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const filterMembers = (category: string) => {
    return category === "All"
      ? members
      : members.filter((member) => member.categories.includes(category));
  };

  const filteredMembers = filterMembers(selectedCategory);

  return (
    <div className="p-4 md:p-8">
      <div className="mb-4 scrollbar-hide text-center">
        {isMobileView ? (
          <div className="relative inline-block text-left">
            <button
              type="button"
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-[var(--background-secondary)] px-3 py-2 text-sm font-semibold text-[var(--primary)] shadow-sm ring-1 ring-inset ring-[var(--dropdown)] hover:bg-[var(--background)]"
              id="menu-button"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              {t(selectedCategory)}
              <svg
                className="-mr-1 h-5 w-5 text-[var(--text-secondary)]"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <div
                className="absolute z-10 mt-2 left-1/2 transform -translate-x-1/2 w-56 origin-top rounded-md bg-[var(--background-secondary)] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex={-1}
              >
                <div className="py-1" role="none">
                  {categories.map((category) => (
                    <a
                      key={category}
                      href="#"
                      className={`block px-4 py-2 text-sm text-[var(--primary)] hover:bg-[var(--dropdown-hover)] transition-all ${
                        selectedCategory === category ? "bg-data-purple text-white" : ""
                      }`}
                      role="menuitem"
                      tabIndex={-1}
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedCategory(category);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <span>{categoryIcons[category]}</span>
                      <span>{t(category)}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center space-x-4 min-w-full custom-padding-bottom">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-all mb-5 ${
                  selectedCategory === category
                    ? "bg-data-purple text-white"
                    : "bg-[var(--background-secondary)] text-[var(--primary)] hover:bg-[var(--dropdown-hover)]"
                }`}
              >
                <span className="flex items-center space-x-2">
                  {categoryIcons[category]}
                  <span>{t(category)}</span>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-6">
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
                <p>{member.special_role.join(" & ")}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizingCommittee;

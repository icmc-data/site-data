import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@/src/navigation';

interface PageListProps {
  pages: { name: string; path: string }[];
  pageListName: string;
  locale: string;
  className?: string;
  active?: boolean; // Add active prop
}

const PageList: React.FC<PageListProps> = ({ pages, pageListName, locale, className, active }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [dropdownOpen]);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`text-center w-full ${active ? 'text-data-purple' : 'text-primary'}`}
      >
        {pageListName}
      </button>

      {dropdownOpen && (
        <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 w-auto bg-dropdown shadow-md rounded-md z-50">
          <div className="py-1 flex flex-col items-center">
            {pages.map((page, index) => (
              <Link
                key={index}
                lang={locale}
                href={page.path as "/pages/about" | "/pages/fronts" | "/pages/competitions" | "/pages/learn" | "/pages/projects" | "/pages/contact" | "/pages/events/dataDay"}
                className="block px-4 py-2 text-primary hover:bg-dropdown-hover text-center whitespace-nowrap"
                onClick={() => setDropdownOpen(false)} // close dropdown on link click
              >
                {page.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PageList;
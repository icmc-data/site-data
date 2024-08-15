import React, { useState } from 'react';
import { Link } from '@/src/navigation';

interface PageListProps {
  pages: { name: string; path: string }[];
  pageListName: string;
  locale: string;
  className?: string;
}

const PageList: React.FC<PageListProps> = ({ pages, pageListName, locale, className }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="text-center w-full text-primary"
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
                href={page.path}
                className="block px-4 py-2 text-primary hover:bg-dropdown-hover text-center whitespace-nowrap"
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

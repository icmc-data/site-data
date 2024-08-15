import React, { useState } from 'react';
import { Link } from '@/src/navigation';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

interface PageListProps {
  pages: { name: string; path: string }[];
  pageListName: string;
  locale: string;
}

const PageList: React.FC<PageListProps> = ({ pages, pageListName, locale }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Verificar se está em modo mobile
  const isMobile = window.innerWidth <= 800;

  return (
    <div className={`relative inline-block text-left ${isMobile ? 'w-full text-center' : ''}`}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="inline-flex justify-center items-center text-primary hover:text-data-purple"
      >
        {pageListName}
      </button>

      {dropdownOpen && (
        <div className={`absolute z-50 mt-2 ${isMobile ? 'w-full left-0 right-0 mx-auto' : 'w-56'} rounded-md shadow-lg bg-background-secondary dark:bg-background ring-1 ring-black ring-opacity-5 focus:outline-none`}>
          <div className="py-1">
            {pages.map((page, index) => (
              <Link
                key={index}
                lang={locale}
                href={page.path}
                className="block px-4 py-2 text-sm text-primary hover:text-data-purple"
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

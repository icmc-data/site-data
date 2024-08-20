"use client";
import { useState, useEffect } from 'react';
import PostList from './PostList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface PostSearchProps {
  markdownFiles: any[];
  onPostClick: (content: string, tags: string[]) => void;
  locale: string;
  placeholderText?: string; 
  hideSearchBar?: boolean; 
}

export default function PostSearch({
  markdownFiles,
  onPostClick,
  locale,
  placeholderText = "Search posts...",
  hideSearchBar = false,
}: PostSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(markdownFiles);
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollTop > lastScrollTop) {
        // Rolando para baixo
        setShowSearchBar(false);
      } else {
        // Rolando para cima
        setShowSearchBar(true);
      }

      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === '') {
      setFilteredPosts(markdownFiles);
    } else {
      const filtered = markdownFiles.filter((file) => {
        const tagsMatch = file.data.tags?.some((tag: string) => tag.toLowerCase().includes(term));
        const titleMatch = file.data.name?.toLowerCase().includes(term);
        const descriptionMatch = file.data.description?.toLowerCase().includes(term);

        return tagsMatch || titleMatch || descriptionMatch;
      });
      setFilteredPosts(filtered);
    }
  };

  return (
    <div>
      {showSearchBar && !hideSearchBar && (
        <div className="sticky top-0 z-50 bg-background-secondary p-2 shadow-md rounded-t-lg"> {/* Adicionada a classe rounded-t-lg */}
          <div className="relative w-full mb-4">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FontAwesomeIcon icon={faSearch} className="text-data-purple" />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder={" " + placeholderText} 
              className="w-full p-2 pl-10 border rounded border-data-purple text-primary bg-background-secondary"
            />
          </div>
        </div>
      )}
      <PostList markdownFiles={filteredPosts} onPostClick={onPostClick} locale={locale} page="learn" />
    </div>
  );
}

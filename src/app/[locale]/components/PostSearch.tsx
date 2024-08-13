"use client";
import { useState } from 'react';
import PostList from './PostList';

interface PostSearchProps {
  markdownFiles: any[];
  onPostClick: (content: string, tags: string[]) => void;
  locale: string;
  placeholderText?: string; // Propriedade opcional para o placeholder
  hideSearchBar?: boolean; // Propriedade opcional para esconder a barra de pesquisa
}

export default function PostSearch({
  markdownFiles,
  onPostClick,
  locale,
  placeholderText = "Search posts...",
  hideSearchBar = false, // Valor padrão
}: PostSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(markdownFiles);

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
      {!hideSearchBar && (
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder={placeholderText} // Usando o placeholder fornecido ou o padrão
          className="w-full p-2 mb-4 border rounded border-data-purple text-primary bg-background-secondary"
        />
      )}
      <PostList markdownFiles={filteredPosts} onPostClick={onPostClick} locale={locale} page="learn" />
    </div>
  );
}

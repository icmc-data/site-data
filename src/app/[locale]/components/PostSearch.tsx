"use client";
import { useState } from 'react';
import PostList from './PostList';

interface PostSearchProps {
  markdownFiles: any[];
  onPostClick: (content: string, tags: string[]) => void;
  locale: string;
}

export default function PostSearch({ markdownFiles, onPostClick, locale }: PostSearchProps) {
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
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search posts..."
        className="w-full p-2 mb-4 border rounded border-data-purple text-primary bg-background-secondary"
      />
      <PostList markdownFiles={filteredPosts} onPostClick={onPostClick} locale={locale} page="learn" />
    </div>
  );
}

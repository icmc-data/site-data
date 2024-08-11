"use client"
import { useTranslations } from 'next-intl';
import PostList from '../../components/PostList';
import postsLearn from '@/data/postsLearn.json';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import { useEffect, useState } from 'react';

export default function Learn() {
  const t = useTranslations('');
  const [markdownContent, setMarkdownContent] = useState<string | null>(null);

  useEffect(() => {
    const loadMarkdown = async () => {
      const response = await fetch('/a.md');
      const content = await response.text();
      setMarkdownContent(content);
    };

    loadMarkdown();
  }, []);

  return (
    <div className='px-32 py-24 text-center text-2xl'>
      <PostList posts={postsLearn} />
      
      <div className="mt-10 text-left">
        {markdownContent ? (
          <MarkdownRenderer content={markdownContent} />
        ) : (
          <div>Loading content...</div>
        )}
      </div>
    </div>
  );
}

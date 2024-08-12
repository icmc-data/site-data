"use client"
import { useTranslations } from 'next-intl';
import PostList from '../../components/PostList';
import { useEffect, useState } from 'react';
import matter from 'gray-matter';

export default function Learn() {
  const t = useTranslations('');
  const [markdownFiles, setMarkdownFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMarkdownFiles = async () => {
      let fileNumber = 1;
      const contents = [];

      while (true) {
        const file = `/learnPosts/${fileNumber}.md`;
        try {
          const response = await fetch(file);
          if (!response.ok) break; // stop if the file doesn't exist
          const content = await response.text();
          contents.push(content);
          fileNumber++;
        } catch (error) {
          break; // if there is an error in the request, exit the loop
        }
      }

      // reverse the order so the most recent is displayed first
      setMarkdownFiles(contents.reverse());
      setLoading(false); // set loading to false when done
    };

    loadMarkdownFiles();
  }, []);

  return (
    <div className='px-32 py-24 text-center text-2xl'>
      {loading ? (
        <div>Loading content...</div>
      ) : markdownFiles.length > 0 ? (
        <>
          <PostList markdownFiles={markdownFiles} />
          <div className="mt-10 text-left">
          </div>
        </>
      ) : (
        <div>No posts have been made yet.</div>
      )}
    </div>
  );
}

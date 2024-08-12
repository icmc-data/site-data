"use client";
import { useTranslations } from 'next-intl';
import PostList from '../../components/PostList';
import MarkdownRenderer from '../../components/MarkdownRenderer'; 
import { useEffect, useState } from 'react';

export default function Learn() {
  const t = useTranslations('');
  const locale = t('DONT_DELETE'); // gets the value of the DONT_DELETE variable
  const [markdownFiles, setMarkdownFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<string | null>(null); // stores the selected post

  useEffect(() => {
    const loadMarkdownFiles = async () => {
      setLoading(true); // starts loading
      let fileNumber = 1;
      const contents = [];
      const folder = locale; // uses the DONT_DELETE value directly for the folder

      console.log(`Loading posts from folder: ${folder}`); // check if the folder value is correct

      while (true) {
        const file = `/learnPosts/${folder}/${fileNumber}.md`;
        console.log(`Trying to load: ${file}`); // log the file it is trying to load

        try {
          const response = await fetch(file);
          if (!response.ok) {
            console.log(`File not found: ${file}`); // log when the file is not found
            break; // stops the loop if the file does not exist
          }
          const content = await response.text();
          contents.push(content);
          fileNumber++;
        } catch (error) {
          console.log(`Error loading file: ${file}`, error); // log the error, if it occurs
          break; // exits the loop in case of an error
        }
      }

      console.log('Loaded posts:', contents); // log the loaded posts

      // reverses the order so that the most recent one is displayed first
      setMarkdownFiles(contents.reverse());
      setLoading(false); // finishes loading
    };

    loadMarkdownFiles();
  }, [locale]); // reloads the posts if the DONT_DELETE value changes

  const handlePostClick = (content: string) => {
    setSelectedPost(content); // sets the selected post content
  };

  return (
    <div className='px-32 py-24 text-2xl'>
      {loading ? (
        <div>{t('LearnSection.Loading_Content')}</div>
      ) : selectedPost ? (
        // if a post is selected, display its content
        <MarkdownRenderer content={selectedPost} />
      ) : markdownFiles.length > 0 ? (
        <>
          <PostList markdownFiles={markdownFiles} onPostClick={handlePostClick} />
          <div className="mt-10 text-left">
          </div>
        </>
      ) : (
        <div>{t('LearnSection.No_Posts')}</div>
      )}
    </div>
  );
}

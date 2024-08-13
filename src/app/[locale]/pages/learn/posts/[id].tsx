'use client';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import MarkdownRenderer from '../../../components/MarkdownRenderer';
import { useEffect, useState } from 'react';
import matter from 'gray-matter';

export default function PostPage() {
  const t = useTranslations('');
  const { id } = useParams(); 
  const locale = t('DONT_DELETE');
  const [postContent, setPostContent] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      const file = `/learnPosts/${locale}/${id}.md`; 
      try {
        const response = await fetch(file);
        if (response.ok) {
          const content = await response.text();
          setPostContent(content);
        } else {
          setPostContent(null);
        }
      } catch (error) {
        setPostContent(null);
      }
    };

    if (id) {
      loadPost();
    }
  }, [id, locale]);

  return (
    <div className='px-32 py-24 text-2xl'>
      {postContent ? (
        <MarkdownRenderer content={postContent} />
      ) : (
        <div>{t('LearnSection.Post_Not_Found')}</div>
      )}
    </div>
  );
}

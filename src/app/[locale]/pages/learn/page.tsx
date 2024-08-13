"use client";
import { useTranslations } from 'next-intl';
import MarkdownRenderer from '../../components/MarkdownRenderer'; 
import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import matter from 'gray-matter';
import { useSearchParams } from 'next/navigation';
import { useRouter } from "@/src/navigation";
import PostSearch from '../../components/PostSearch'; 

export default function Learn() {
  const t = useTranslations('');
  const locale = t('DONT_DELETE');
  const [markdownFiles, setMarkdownFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<{ content: string, tags: string[], relatedPosts: any[] } | null>(null); 
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const loadMarkdownFiles = async () => {
      setLoading(true);
      let fileNumber = 1;
      const files = [];
      const folder = locale;

      while (true) {
        const fileUrl = `/learnPosts/${folder}/${fileNumber}.md`;

        try {
          const response = await fetch(fileUrl);
          if (!response.ok) break; // se a resposta não for OK, paramos de buscar
          const text = await response.text();
          const parsedFile = matter(text); // faz o parse do frontmatter e conteúdo
          files.push(parsedFile); // adiciona o conteúdo processado
          fileNumber++;
        } catch (error) {
          console.error('Erro ao carregar arquivo:', fileUrl, error);
          break;
        }
      }

      setMarkdownFiles(files.reverse());
      setLoading(false);
    };

    loadMarkdownFiles();
  }, [locale]);

  useEffect(() => {
    const post = searchParams.get('post');

    if (post && markdownFiles.length > 0) {
      const postNumber = parseInt(post, 10);
      if (!isNaN(postNumber) && postNumber > 0 && postNumber <= markdownFiles.length) {
        const file = markdownFiles[postNumber - 1];
        handlePostClick(file.content, file.data.tags || []);
      }
    }
  }, [searchParams, markdownFiles]);

  const findRelatedPosts = (tags: string[], currentPostIndex: number) => {
    if (!tags || tags.length === 0) return [];

    const relatedPosts = markdownFiles.filter((file, index) => {
      if (index + 1 === currentPostIndex) return false; // exclui o post atual
      const commonTags = file.data.tags?.filter((tag: string) => tags.includes(tag)) || [];
      return commonTags.length > 0;
    }).slice(0, 3); // limita a 3 posts relacionados

    return relatedPosts;
  };

  const handlePostClick = (content: string, tags: string[]) => {
    const relatedPosts = findRelatedPosts(tags, 0); // Ajuste conforme necessário
    setSelectedPost({ content, tags, relatedPosts });
  };
  

  const handleBackClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setSelectedPost(null);
    router.push('/pages/learn');
  };

  return (
    <div className='px-32 py-24 text-2xl'>
      {loading ? (
        <div>{t('Posts.Loading_Content')}</div>
      ) : selectedPost ? (
        <div>
          <Button
            variant="secondary"
            size="medium"
            rounded={false}
            iconName="FaArrowLeft"
            onClick={handleBackClick}
          >
            {t('Posts.Back_Button')}
          </Button>
          <MarkdownRenderer content={selectedPost.content} />
          <div className="mt-10">
            <h3>{t('Posts.Related_Posts')}</h3>
            {selectedPost.relatedPosts && selectedPost.relatedPosts.length > 0 ? (
              <>
                <br />
                <PostSearch markdownFiles={selectedPost.relatedPosts} onPostClick={handlePostClick} locale={locale} hideSearchBar={true}/>
              </>
            ) : (
              <p>{t('Posts.No_Related_Posts')}</p>
            )}
          </div>
        </div>
      ) : markdownFiles.length > 0 ? (
        <>
          <PostSearch markdownFiles={markdownFiles} onPostClick={handlePostClick} placeholderText={t('Posts.Search')} locale={locale} />
          <div className="mt-10 text-left"></div>
        </>
      ) : (
        <div>{t('Posts.No_Related_Posts')}</div>
      )}
    </div>
  );
}

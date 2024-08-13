"use client";
import { useTranslations } from 'next-intl';
import PostList from '../../components/PostList';
import MarkdownRenderer from '../../components/MarkdownRenderer'; 
import { useEffect, useState } from 'react';
import Button from '../../components/Button'; // Importa o componente Button
import matter from 'gray-matter'; // Importa o matter para analisar os arquivos markdown
import { useSearchParams } from 'next/navigation'; // Importa useSearchParams para acessar parâmetros da query string

export default function Learn() {
  const t = useTranslations('');
  const locale = t('DONT_DELETE'); // gets the value of the DONT_DELETE variable
  console.log(`Locale: ${locale}`); // Verifica o valor da locale
  const [markdownFiles, setMarkdownFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<{ content: string, tags: string[] } | null>(null); // stores the selected post with tags
  const [postHistory, setPostHistory] = useState<{ content: string, tags: string[] }[]>([]); // stores the history of posts
  const searchParams = useSearchParams(); // useSearchParams para acessar parâmetros de consulta

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

  useEffect(() => {
    const post = searchParams.get('post'); // Access the "post" query parameter

    if (post && markdownFiles.length > 0) {
      const postNumber = parseInt(post, 10);
      if (!isNaN(postNumber) && postNumber > 0 && postNumber <= markdownFiles.length) {
        const content = markdownFiles[postNumber - 1];
        const { data, content: markdownContent } = matter(content); // Separa os metadados do conteúdo
        handlePostClick(markdownContent, data.tags); // Renderiza apenas o conteúdo, sem os metadados
      }
    }
  }, [searchParams, markdownFiles]);

  const handlePostClick = (content: string, tags: string[]) => {
    if (selectedPost) {
      setPostHistory([...postHistory, selectedPost]); // Adiciona o post atual ao histórico antes de mudar
    }
    setSelectedPost({ content, tags }); // sets the selected post content and tags
  };

  const handleBackClick = () => {
    if (postHistory.length > 0) {
      const lastPost = postHistory[postHistory.length - 1];
      setSelectedPost(lastPost); // Volta ao último post no histórico
      setPostHistory(postHistory.slice(0, -1)); // Remove o último post do histórico
    } else {
      setSelectedPost(null); // resets selectedPost to null to show the list of posts
    }
  };

  const getRelatedPosts = () => {
    if (!selectedPost) return [];
    return markdownFiles.filter(fileContent => {
      const { data, content } = matter(fileContent);
      return (
        data.tags.some((tag: string) => selectedPost.tags.includes(tag)) &&
        content !== selectedPost.content
      );
    });
  };

  const relatedPosts = getRelatedPosts();

  return (
    <div className='px-32 py-24 text-2xl'>
      {loading ? (
        <div>{t('LearnSection.Loading_Content')}</div>
      ) : selectedPost ? (
        <div>
          <Button
            variant="secondary"
            size="medium"
            rounded={false}
            iconName="FaArrowLeft" // Nome do ícone
            onClick={handleBackClick}
          >
            {postHistory.length > 0 ? t('LearnSection.Back_To_Previous_Post') : t('LearnSection.Back_Button')}
          </Button>
          <MarkdownRenderer content={selectedPost.content} />
          <div className="mt-10">
            <h2 className="text-primary dark:text-primary text-2xl font-bold mb-4">{t('LearnSection.Related_Posts')}</h2>
            {relatedPosts.length > 0 ? (
              <PostList markdownFiles={relatedPosts} onPostClick={handlePostClick} locale={locale} page="learn" />
            ) : (
              <p>{t('LearnSection.No_Related_Posts')}</p>
            )}
          </div>
        </div>
      ) : markdownFiles.length > 0 ? (
        <>
          <PostList markdownFiles={markdownFiles} onPostClick={handlePostClick} locale={locale} page="learn" />
          <div className="mt-10 text-left"></div>
        </>
      ) : (
        <div>{t('LearnSection.No_Posts')}</div>
      )}
    </div>
  );
}

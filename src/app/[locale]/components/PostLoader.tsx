import { useState, useEffect } from 'react';
import matter from 'gray-matter';
import LoadingOverlay from './LoadingOverlay';
type PostLoaderProps = {
  locale: string;
  onPostsLoaded: (posts: any[]) => void;
};

const PostLoader: React.FC<PostLoaderProps> = ({ locale, onPostsLoaded }) => {
  const [loading, setLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(true);

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
          if (!response.ok) break;
          const text = await response.text();
          const parsedFile = matter(text);
          files.push(parsedFile);
          fileNumber++;
        } catch (error) {
          console.error('Erro ao carregar arquivo:', fileUrl, error);
          break;
        }
      }

      onPostsLoaded(files.reverse());
      setLoading(false);

      setTimeout(() => setShowLoading(false), 300);
    };

    loadMarkdownFiles();
  }, [locale]);

  return (
    <div>
      {showLoading && (
        <LoadingOverlay />
      )}
    </div>
  );
};

export default PostLoader;

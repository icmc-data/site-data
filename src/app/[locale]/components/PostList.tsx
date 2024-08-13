import React from 'react';
import matter from 'gray-matter';

type Post = {
  name: string;
  photo: string;
  description: string;
  tags: string[];
  content: string;
  index: number; // Adicionei o índice para criar o link correto
};

type PostListProps = {
  markdownFiles: string[];
  onPostClick: (content: string, tags: string[]) => void;
  locale: string; // Adicione o locale como uma prop
  page: string; // Adicione a propriedade 'page'
};

const PostList: React.FC<PostListProps> = ({ markdownFiles, onPostClick, locale, page }) => {
  console.log(`Received locale: ${locale}`); // Verifica se a locale foi recebida corretamente

  const posts = markdownFiles.map((fileContent, index) => {
    const { data, content } = matter(fileContent);
    return {
      name: data.name,
      photo: data.photo,
      description: data.description,
      tags: data.tags,
      content,
      index: index + 1, 
    } as Post;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div 
          key={post.index} 
          className="bg-background-secondary dark:bg-background-secondary shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105 cursor-pointer"
          onClick={() => {
            window.location.href = `/${locale}/pages/${page}?post=${post.index}`;
          }}
        >
          <img
            src={post.photo}
            alt={post.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-primary dark:text-primary font-bold mb-2 font-montserrat text-lg">
              {post.name}
            </h2>
            <p className="text-text-secondary dark:text-text-secondary text-description mb-4">
              {post.description}
            </p>
            <div className="flex flex-wrap">
              {post.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="text-sm bg-data-purple text-background dark:text-background rounded-full px-3 py-1 mr-2 mb-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;

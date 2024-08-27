import React from 'react';

type Post = {
  name: string;
  photo: string;
  description: string;
  tags: string[];
  content: string;
  index: number;
};

type PostListProps = {
  markdownFiles: any[];
  onPostClick: (content: string, tags: string[]) => void;
  locale: string;
  page: string;
};

const PostList: React.FC<PostListProps> = ({ markdownFiles, onPostClick, locale, page }) => {
  const posts = markdownFiles.map((file, index) => {
    const { data, content } = file;
    return {
      name: data.name || 'Untitled Post', 
      photo: data.photo || '/default-photo.jpg', 
      description: data.description || 'No description available.', 
      tags: data.tags || [], 
      content,
      index: index + 1, 
    } as Post;
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div 
          key={post.index} 
          className="post-item bg-background-secondary shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105 cursor-pointer relative"
          onClick={() => {
            window.location.href = `/${locale}/pages/${page}?post=${post.index}`;
          }}
        >
          {post.photo && (
            <img
              src={post.photo}
              alt={post.name}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <h2 className="text-primary font-bold mb-2 font-montserrat text-lg">
              {post.name}
            </h2>
            <p className="text-text-secondary text-description mb-4">
              {post.description}
            </p>
            <div className="flex flex-wrap">
              {post.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="text-sm bg-data-purple text-background rounded-full px-3 py-1 mr-2 mb-2"
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

import React from 'react';
import MarkdownRenderer from './MarkdownRenderer';
import Button from './Button';
import PostSearch from './PostSearch';

type PostContentProps = {
  selectedPost: { content: string, tags: string[], relatedPosts: any[] } | null;
  onBackClick: () => void;
  onPostClick: (content: string, tags: string[]) => void;
  locale: string;
};

const PostContent: React.FC<PostContentProps> = ({ selectedPost, onBackClick, onPostClick, locale }) => {
  if (!selectedPost) return null;

  return (
    <div>
      <Button
        variant="secondary"
        size="medium"
        rounded={false}
        iconName="FaArrowLeft"
        onClick={onBackClick}
      >
        Voltar
      </Button>
      <MarkdownRenderer content={selectedPost.content} />
      <div className="mt-10">
        <h3>Posts Relacionados</h3>
        {selectedPost.relatedPosts && selectedPost.relatedPosts.length > 0 ? (
          <>
            <br />
            <PostSearch
              markdownFiles={selectedPost.relatedPosts}
              onPostClick={onPostClick}
              locale={locale}
              hideSearchBar={true}
            />
          </>
        ) : (
          <p>Nenhum post relacionado encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default PostContent;

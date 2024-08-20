import { FC } from 'react';
import MarkdownIt from 'markdown-it';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: FC<MarkdownRendererProps> = ({ content }) => {
  const md = new MarkdownIt();
  const htmlContent = md.render(content);

  return (
    <div
      className="prose prose-lg prose-primary dark:prose-dark max-w-none mx-auto p-8 bg-background-secondary rounded-md shadow-lg"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default MarkdownRenderer;

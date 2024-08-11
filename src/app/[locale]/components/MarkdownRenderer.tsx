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
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default MarkdownRenderer;

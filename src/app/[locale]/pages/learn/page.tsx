"use client";
import { useTranslations } from "next-intl";
import MarkdownRenderer from "../../components/MarkdownRenderer";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import matter from "gray-matter";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/src/navigation";
import PostSearch from "../../components/PostSearch";
import LoadingOverlay from "../../components/LoadingOverlay";
import { Footer } from "../../components/Footer";

export default function Learn() {
  const t = useTranslations("");
  const locale = t("DONT_DELETE");
  const [markdownFiles, setMarkdownFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<{
    content: string;
    tags: string[];
    relatedPosts: any[];
  } | null>(null);
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
          if (!response.ok) break;
          const text = await response.text();
          const parsedFile = matter(text);
          files.push(parsedFile);
          fileNumber++;
        } catch (error) {
          console.error("Erro ao carregar arquivo:", fileUrl, error);
          break;
        }
      }

      setMarkdownFiles(files.reverse());
      setLoading(false);

      setTimeout(() => setShowLoading(false), 300);
    };

    loadMarkdownFiles();
  }, [locale]);

  useEffect(() => {
    const post = searchParams.get("post");

    if (post && markdownFiles.length > 0) {
      const postNumber = parseInt(post, 10);
      if (
        !isNaN(postNumber) &&
        postNumber > 0 &&
        postNumber <= markdownFiles.length
      ) {
        const file = markdownFiles[postNumber - 1];
        handlePostClick(file.content, file.data.tags || []);
      }
    }
  }, [searchParams, markdownFiles]);

  const findRelatedPosts = (tags: string[], currentPostIndex: number) => {
    if (!tags || tags.length === 0) return [];

    const relatedPosts = markdownFiles
      .filter((file, index) => {
        if (index + 1 === currentPostIndex) return false;
        const commonTags =
          file.data.tags?.filter((tag: string) => tags.includes(tag)) || [];
        return commonTags.length > 0;
      })
      .slice(0, 3);

    return relatedPosts;
  };

  const handlePostClick = (content: string, tags: string[]) => {
    const relatedPosts = findRelatedPosts(tags, 0);
    setSelectedPost({ content, tags, relatedPosts });
  };

  const handleBackClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setSelectedPost(null);
    router.push("/pages/learn");
  };

  return (
    <div className="px-4 py-10 md:px-10 md:py-20 mt-24">
      {showLoading ? (
        <div className="transition-opacity duration-500 opacity-100">
          <LoadingOverlay />
        </div>
      ) : (
        <div className="transition-opacity duration-500 opacity-100">
          {selectedPost ? (
            <div>
              <Button
                variant="secondary"
                size="medium"
                iconName="FaArrowLeft"
                onClick={handleBackClick}
              >
                {t("Posts.Back_Button")}
              </Button>
              <MarkdownRenderer content={selectedPost.content} />
              <div className="mt-10">
                <h3 className="text-2xl md:text-3xl">
                  {t("Posts.Related_Posts")}
                </h3>
                {selectedPost.relatedPosts &&
                selectedPost.relatedPosts.length > 0 ? (
                  <>
                    <br />
                    <PostSearch
                      markdownFiles={selectedPost.relatedPosts}
                      onPostClick={handlePostClick}
                      locale={locale}
                      hideSearchBar={true}
                    />
                  </>
                ) : (
                  <p>{t("Posts.No_Related_Posts")}</p>
                )}
              </div>
            </div>
          ) : markdownFiles.length > 0 ? (
            <>
              <PostSearch
                markdownFiles={markdownFiles}
                onPostClick={handlePostClick}
                placeholderText={t("Posts.Search")}
                locale={locale}
              />
              <div className="mt-10 text-left"></div>
            </>
          ) : (
            <div>{t("Posts.No_Related_Posts")}</div>
          )}
        </div>
      )}
    </div>
  );
}

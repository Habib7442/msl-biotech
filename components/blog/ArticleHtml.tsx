import { sanitizeArticleHtml } from "@/lib/html";

interface ArticleHtmlProps {
  html: string;
}

/**
 * Article body written in the admin's rich text editor. Sanitized on the
 * server (lib/html.ts) right before rendering, so nothing unsafe reaches the
 * page even if the stored HTML was edited elsewhere. Uses the same
 * .article-body styles as Markdown articles (ArticleBody).
 */
export default function ArticleHtml({ html }: ArticleHtmlProps) {
  return <div className="article-body" dangerouslySetInnerHTML={{ __html: sanitizeArticleHtml(html) }} />;
}

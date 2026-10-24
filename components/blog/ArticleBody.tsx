import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";

interface ArticleBodyProps {
  markdown: string;
}

// The article's own <h1> is the title, so a stray "# heading" in the body
// renders as an <h2> to keep a single H1 per page (client spec §1).
const components: Components = {
  h1: ({ children }) => <h2>{children}</h2>,
  a: ({ href = "", children }) =>
    href.startsWith("/") ? (
      <Link href={href}>{children}</Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  img: ({ src, alt }) =>
    typeof src === "string" ? (
      // eslint-disable-next-line @next/next/no-img-element -- Sanity CDN images of unknown size; lazy-loaded below the fold
      <img src={src} alt={alt ?? ""} loading="lazy" decoding="async" />
    ) : null,
};

/** Markdown from the admin panel. Raw HTML in the source is not rendered. */
export default function ArticleBody({ markdown }: ArticleBodyProps) {
  return (
    <div className="article-body">
      <ReactMarkdown components={components}>{markdown}</ReactMarkdown>
    </div>
  );
}

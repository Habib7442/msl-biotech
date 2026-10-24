import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowLeft, ChevronRight } from "lucide-react";
import ArticleBody from "@/components/blog/ArticleBody";
import PostCard from "@/components/blog/PostCard";
import JsonLd from "@/components/JsonLd";
import { urlForImage } from "@/lib/sanity/image";
import { formatDate, getPostBySlug, getPostSlugs, hasImage, readingMinutes } from "@/lib/sanity/posts";
import { SITE_URL } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article Not Found" };

  const description = post.seo?.description || post.excerpt || undefined;
  const shareImage = hasImage(post.og?.image) ? post.og.image : hasImage(post.coverImage) ? post.coverImage : null;

  return {
    // An SEO title is written in full, so it skips the "| MSL Biotech" template.
    title: post.seo?.title ? { absolute: post.seo.title } : post.title,
    description,
    alternates: { canonical: post.seo?.canonical || `/blog/${slug}` },
    ...(post.seo?.noindex ? { robots: { index: false, follow: true } } : {}),
    authors: post.author ? [{ name: post.author }] : undefined,
    openGraph: {
      type: "article",
      title: post.og?.title || post.seo?.title || post.title,
      description: post.og?.description || description,
      url: `${SITE_URL}/blog/${slug}`,
      publishedTime: post.publishedAt,
      ...(post.updatedAt ? { modifiedTime: post.updatedAt } : {}),
      ...(post.tags?.length ? { tags: post.tags } : {}),
      ...(shareImage
        ? {
            images: [
              {
                url: urlForImage(shareImage).width(1200).height(630).fit("crop").auto("format").url(),
                width: 1200,
                height: 630,
                alt: shareImage.alt ?? post.title,
              },
            ],
          }
        : {}),
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${slug}`;
  const related = (post.related.length ? post.related : post.latest).slice(0, 3);
  const cover = hasImage(post.coverImage) ? post.coverImage : null;
  const coverUrl = cover ? urlForImage(cover).width(1600).height(900).fit("crop").auto("format").url() : null;

  const articleData: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    mainEntityOfPage: url,
    url,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    ...(post.excerpt ? { description: post.excerpt } : {}),
    ...(coverUrl ? { image: [coverUrl] } : {}),
    ...(post.author ? { author: { "@type": "Person", name: post.author } } : {}),
    publisher: {
      "@type": "Organization",
      name: "MSL Biotech Private Limited",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.webp` },
    },
    ...(post.category ? { articleSection: post.category } : {}),
    ...(post.tags?.length ? { keywords: post.tags.join(", ") } : {}),
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <div className="w-full">
      <JsonLd data={articleData} />
      <JsonLd data={breadcrumbs} />

      <section className="bg-white border-b border-gray-100 pt-28 pb-6 md:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-400 font-medium min-w-0">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="size-3 shrink-0" aria-hidden="true" />
              <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
              <ChevronRight className="size-3 shrink-0" aria-hidden="true" />
              <span className="text-brand-navy truncate max-w-[220px]" aria-current="page">{post.title}</span>
            </nav>
            <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-primary/80 transition-colors w-fit">
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              <span>All articles</span>
            </Link>
          </div>
        </div>
      </section>

      <article className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <header>
            {post.category ? (
              <span className="inline-flex items-center rounded-full bg-[#EAF4DA] px-3.5 py-1 text-xs font-semibold text-brand-navy uppercase tracking-wider">
                {post.category}
              </span>
            ) : null}
            <h1 className="mt-4 font-heading text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-brand-navy tracking-tight leading-tight">
              {post.title}
            </h1>
            <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500">
              {post.author ? <span className="font-semibold text-brand-navy">{post.author}</span> : null}
              {post.author ? <span aria-hidden="true">·</span> : null}
              <span>
                Published <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </span>
              {post.updatedAt ? (
                <>
                  <span aria-hidden="true">·</span>
                  <span>
                    Updated <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
                  </span>
                </>
              ) : null}
              <span aria-hidden="true">·</span>
              <span>{readingMinutes(post.body)} min read</span>
            </p>
          </header>

          {cover && coverUrl ? (
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[28px] bg-[#F4F7FB]">
              <Image src={coverUrl} alt={cover.alt ?? ""} fill priority sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
            </div>
          ) : null}

          <div className="mt-10">
            <ArticleBody markdown={post.body} />
          </div>

          {post.tags?.length ? (
            <ul className="mt-10 flex flex-wrap gap-2" aria-label="Tags">
              {post.tags.map((tag) => (
                <li key={tag} className="rounded-full bg-[#F4F7FB] px-3 py-1 text-xs font-semibold text-brand-navy">
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}

          <aside className="bg-red-50/50 border border-red-100 rounded-2xl p-5 mt-10 flex items-start gap-3">
            <AlertTriangle className="size-5 text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-xs text-red-700 leading-normal font-medium">
              <span className="font-bold block uppercase tracking-wider mb-1 text-red-800">Medical Disclaimer</span>
              This article is for general information only and is not a substitute for advice from a registered medical practitioner. Do not self-medicate.
            </p>
          </aside>
        </div>
      </article>

      {related.length ? (
        <section className="bg-[#F4F7FB] py-16 border-t border-gray-100" aria-labelledby="related-title">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 id="related-title" className="font-heading text-xl font-bold text-brand-navy mb-8 uppercase tracking-wider">
              {post.related.length ? "Related Articles" : "Latest Articles"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((item) => (
                <PostCard key={item._id} post={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

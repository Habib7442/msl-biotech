import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
import PostCard from "@/components/blog/PostCard";
import { getPostsPage, POSTS_PER_PAGE } from "@/lib/sanity/posts";
import { cn } from "@/lib/utils";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description: "Health information, product guides and company news from MSL Biotech, a pharmaceutical marketing company in Guwahati, Assam.",
  alternates: { canonical: "/blog" },
};

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number.parseInt(pageParam ?? "1", 10) || 1);
  const { items, total } = await getPostsPage(page);
  const pages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
  if (page > pages) notFound();

  const pageHref = (p: number) => (p === 1 ? "/blog" : `/blog?page=${p}`);

  return (
    <div className="w-full flex-grow flex flex-col">
      <section className="bg-[#12213F] text-white pt-28 pb-16 md:pt-36 md:pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-400 font-medium">
            <Link href="/" className="hover:text-[#7FC700] transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white" aria-current="page">Blog</span>
          </nav>
          <h1 className="mt-2.5 font-heading text-4xl sm:text-5xl font-bold text-white tracking-tight">Blog</h1>
          <p className="mt-2.5 text-gray-400 text-sm max-w-xl">
            Health information, product guides and news from MSL Biotech.
          </p>
        </div>
      </section>

      <section className="bg-[#F4F7FB] py-12 flex-grow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {items.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((post, index) => (
                <PostCard key={post._id} post={post} priority={index === 0} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center">
              <FileText className="mx-auto size-10 text-primary/30" aria-hidden="true" />
              <p className="mt-4 font-heading font-bold text-brand-navy">No articles yet</p>
              <p className="mt-1 text-sm text-gray-500">Check back soon for health guides and news.</p>
            </div>
          )}

          {pages > 1 ? (
            <nav aria-label="Blog pages" className="mt-10 flex items-center justify-center gap-2">
              <Link
                href={pageHref(page - 1)}
                aria-disabled={page <= 1}
                tabIndex={page <= 1 ? -1 : undefined}
                className={cn(
                  "inline-flex items-center gap-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-bold text-brand-navy hover:border-primary/30",
                  page <= 1 && "pointer-events-none opacity-40"
                )}
              >
                <ChevronLeft className="size-4" aria-hidden="true" /> Newer
              </Link>
              {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={pageHref(p)}
                  aria-current={p === page ? "page" : undefined}
                  aria-label={`Page ${p}`}
                  className={cn(
                    "inline-flex size-10 items-center justify-center rounded-xl text-xs font-bold",
                    p === page ? "bg-primary text-white" : "bg-white border border-gray-200 text-brand-navy hover:border-primary/30"
                  )}
                >
                  {p}
                </Link>
              ))}
              <Link
                href={pageHref(page + 1)}
                aria-disabled={page >= pages}
                tabIndex={page >= pages ? -1 : undefined}
                className={cn(
                  "inline-flex items-center gap-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-bold text-brand-navy hover:border-primary/30",
                  page >= pages && "pointer-events-none opacity-40"
                )}
              >
                Older <ChevronRight className="size-4" aria-hidden="true" />
              </Link>
            </nav>
          ) : null}
        </div>
      </section>
    </div>
  );
}

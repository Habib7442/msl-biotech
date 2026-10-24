import Image from "next/image";
import Link from "next/link";
import { FileText } from "lucide-react";
import { formatDate, hasImage, type PostCard as PostCardData } from "@/lib/sanity/posts";
import { urlForImage } from "@/lib/sanity/image";

interface PostCardProps {
  post: PostCardData;
  /** First card on the page: load its image eagerly. */
  priority?: boolean;
}

export default function PostCard({ post, priority = false }: PostCardProps) {
  return (
    <article className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_10px_30px_rgba(18,33,63,0.02)] hover:shadow-[0_15px_35px_rgba(18,33,63,0.05)] hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <Link href={`/blog/${post.slug}`} className="relative aspect-[16/9] bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden block" tabIndex={-1} aria-hidden="true">
        {hasImage(post.coverImage) ? (
          <Image
            src={urlForImage(post.coverImage).width(800).height(450).fit("crop").auto("format").url()}
            alt=""
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center">
            <FileText className="size-10 text-primary/20" />
          </span>
        )}
      </Link>
      <div className="p-6 flex flex-col flex-grow gap-3">
        {post.category ? (
          <span className="rounded-full bg-[#EAF4DA] px-2.5 py-0.5 text-[10px] font-bold text-brand-navy uppercase tracking-wider w-fit">
            {post.category}
          </span>
        ) : null}
        <h2 className="font-heading text-lg font-bold text-brand-navy leading-snug">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </h2>
        {post.excerpt ? <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{post.excerpt}</p> : null}
        <p className="mt-auto pt-2 text-xs text-gray-400">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          {post.author ? ` · ${post.author}` : ""}
        </p>
      </div>
    </article>
  );
}

import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

async function getPost(slug: string) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      title,
      excerpt,
      "date": coalesce(publishedAt, _createdAt),
      author,
      category,
      "image": coverImage.asset->url,
      body
    }`,
    { slug }
  );
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        {post.category && (
          <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded" style={{ background: "#2d4a2d", color: "white" }}>
            {post.category}
          </span>
        )}
        <h1 className="text-4xl font-bold mt-4 mb-3 leading-tight" style={{ fontFamily: "var(--font-playfair)", color: "#1a1a1a" }}>
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="text-lg leading-relaxed mb-4" style={{ color: "#6b6b6b" }}>
            {post.excerpt}
          </p>
        )}
        <div className="flex items-center gap-3 text-sm" style={{ color: "#6b6b6b" }}>
          {post.author && <span>By {post.author}</span>}
          {post.author && <span>·</span>}
          <span>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
        </div>
      </div>

      {/* Cover image */}
      {post.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.image}
          alt={post.title}
          className="w-full rounded-lg mb-10 object-cover"
          style={{ maxHeight: "480px" }}
        />
      )}

      {/* Body */}
      {post.body && (
        <div className="prose prose-lg max-w-none" style={{ color: "#1a1a1a" }}>
          <PortableText value={post.body} />
        </div>
      )}

      {/* Back link */}
      <div className="mt-12 pt-8 border-t" style={{ borderColor: "#d4c9b0" }}>
        <a href="/" className="text-sm font-semibold" style={{ color: "#2d4a2d" }}>
          ← Back to all posts
        </a>
      </div>
    </div>
  );
}

import { client } from "@/sanity/lib/client";
import { PortableText, PortableTextComponents } from "@portabletext/react";
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

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p style={{ marginBottom: "1.5rem", lineHeight: "1.8", fontSize: "1.0625rem", color: "#2a2a2a" }}>{children}</p>
    ),
    h2: ({ children }) => (
      <h2 style={{ fontSize: "1.5rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em", marginTop: "2.5rem", marginBottom: "1rem", color: "#1a1a1a" }}>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 style={{ fontSize: "1.2rem", fontWeight: 900, textTransform: "uppercase", marginTop: "2rem", marginBottom: "0.75rem", color: "#1a1a1a" }}>{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote style={{ borderLeft: "4px solid #2d4a2d", paddingLeft: "1.25rem", margin: "2rem 0", color: "#4a4a4a", fontStyle: "italic", fontSize: "1.1rem" }}>{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong style={{ fontWeight: 900 }}>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => (
      <a href={value?.href} style={{ color: "#2d4a2d", textDecoration: "underline", fontWeight: 600 }} target="_blank" rel="noopener noreferrer">{children}</a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul style={{ marginBottom: "1.5rem", paddingLeft: "1.5rem", listStyleType: "disc" }}>{children}</ul>
    ),
    number: ({ children }) => (
      <ol style={{ marginBottom: "1.5rem", paddingLeft: "1.5rem", listStyleType: "decimal" }}>{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li style={{ marginBottom: "0.5rem", lineHeight: "1.7", color: "#2a2a2a" }}>{children}</li>,
    number: ({ children }) => <li style={{ marginBottom: "0.5rem", lineHeight: "1.7", color: "#2a2a2a" }}>{children}</li>,
  },
};

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-8" style={{ borderBottom: "2px solid #1a1a1a", paddingBottom: "2rem" }}>
        {post.category && (
          <div className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: "#2d4a2d" }}>
            // {post.category}
          </div>
        )}
        <h1 className="font-black uppercase leading-tight mb-4" style={{ fontSize: "2.25rem", letterSpacing: "-0.01em", color: "#1a1a1a" }}>
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="text-lg leading-relaxed mb-4" style={{ color: "#4a4a4a" }}>
            {post.excerpt}
          </p>
        )}
        <div className="flex items-center gap-3 text-sm font-medium" style={{ color: "#6b6b6b" }}>
          {post.author && <span>{post.author}</span>}
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
          className="w-full mb-10 object-cover"
          style={{ maxHeight: "480px", border: "2px solid #1a1a1a", boxShadow: "4px 4px 0px #1a1a1a" }}
        />
      )}

      {/* Body */}
      {post.body && (
        <div>
          <PortableText value={post.body} components={components} />
        </div>
      )}

      {/* Back link */}
      <div className="mt-12 pt-8" style={{ borderTop: "2px solid #1a1a1a" }}>
        <a href="/" className="text-xs font-black uppercase tracking-widest" style={{ color: "#1a1a1a" }}>
          ← Back to all posts
        </a>
      </div>
    </div>
  );
}

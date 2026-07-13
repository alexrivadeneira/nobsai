import { client } from "@/sanity/lib/client";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import CommentSection from "./CommentSection";
import VocabTerm from "@/components/VocabTerm";
import BunnyVideo from "@/components/BunnyVideo";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | noBSAI`,
    description: post.excerpt ?? "Practical AI education from the East Bay.",
    openGraph: {
      title: post.title,
      description: post.excerpt ?? "Practical AI education from the East Bay.",
      url: `https://www.nobsai.tech/blog/${slug}`,
      siteName: "noBSAI",
      images: post.image ? [{ url: post.image, alt: post.title }] : [{ url: "https://www.nobsai.tech/logo.png" }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt ?? "Practical AI education from the East Bay.",
      images: post.image ? [post.image] : ["https://www.nobsai.tech/logo.png"],
    },
  };
}

async function getPost(slug: string) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      title,
      excerpt,
      "date": coalesce(publishedAt, _createdAt),
      author,
      category,
      tags,
      "image": coverImage.asset->url,
      gated,
      body[]{
        ...,
        _type == "image" => { "imageUrl": asset->url },
        markDefs[]{
          ...,
          _type == "vocab" => {
            "termName": term->term,
            "definition": term->definition,
            "moreUrl": term->learnMoreUrl
          }
        }
      }
    }`,
    { slug }
  );
}

async function getOtherPosts(currentSlug: string) {
  return client.fetch(
    `*[_type == "post" && slug.current != $slug] | order(coalesce(publishedAt, _createdAt) desc) {
      "slug": slug.current,
      title,
      excerpt,
      "date": coalesce(publishedAt, _createdAt),
      category,
      "image": coverImage.asset->url
    }`,
    { slug: currentSlug }
  );
}

async function getComments(postSlug: string) {
  return client.fetch(
    `*[_type == "comment" && postSlug == $postSlug && approved == true] | order(submittedAt asc) {
      _id, name, body, submittedAt
    }`,
    { postSlug }
  );
}

function makeComponents(): PortableTextComponents {
  let paragraphIndex = 0;
  return {
  block: {
    normal: ({ children }) => {
      const isFirst = paragraphIndex === 0;
      paragraphIndex++;
      return (
        <p className={isFirst ? "drop-cap" : ""} style={{ marginBottom: "1.5rem", lineHeight: "1.8", fontSize: "1.0625rem", color: "#2a2a2a" }}>
          {children}
        </p>
      );
    },
    h2: ({ children }) => (
      <h2 style={{ fontSize: "1.5rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em", marginTop: "2.5rem", marginBottom: "1rem", color: "#1a1a1a" }}>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 style={{ fontSize: "1.2rem", fontWeight: 900, textTransform: "uppercase", marginTop: "2rem", marginBottom: "0.75rem", color: "#1a1a1a" }}>{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote style={{
        margin: "2.5rem -1.5rem",
        padding: "1.5rem 1.75rem",
        background: "#f0ece0",
        borderLeft: "5px solid #2d4a2d",
        boxShadow: "4px 4px 0 #2d4a2d",
      }}>
        <div style={{ fontSize: "1.2rem", fontStyle: "italic", lineHeight: "1.7", color: "#1a1a1a", fontFamily: "var(--font-fraunces)", fontWeight: 500 }}>
          {children}
        </div>
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong style={{ fontWeight: 900 }}>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => <code style={{ fontFamily: "monospace", fontSize: "0.9em", background: "#e8e4d8", border: "1px solid #c8c4b8", borderRadius: "3px", padding: "0.1em 0.4em" }}>{children}</code>,
    link: ({ value, children }) => (
      <a href={value?.href} style={{ color: "#2d4a2d", textDecoration: "underline", fontWeight: 600 }} target="_blank" rel="noopener noreferrer">{children}</a>
    ),
    vocab: ({ value, children }) => (
      <VocabTerm term={value?.termName} definition={value?.definition} moreUrl={value?.moreUrl}>
        {children}
      </VocabTerm>
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
    types: {
      image: ({ value }: { value: { imageUrl?: string; alt?: string } }) =>
        value?.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value.imageUrl}
            alt={value?.alt ?? ""}
            style={{ display: "block", maxWidth: "100%", margin: "2rem auto", border: "2px solid #1a1a1a", boxShadow: "4px 4px 0 #1a1a1a" }}
          />
        ) : null,
      bunnyEmbed: ({ value }: { value: { videoId?: string; caption?: string } }) => (
        <BunnyVideo videoId={value.videoId} caption={value.caption} />
      ),
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const cookieStore = await cookies();
  const hasAccess = cookieStore.get("nobsai_access")?.value === "1";
  const [comments, otherPosts] = await Promise.all([getComments(slug), getOtherPosts(slug)]);

  if (post.gated && !hasAccess) {
    const joinUrl = `/join?redirect=/blog/${slug}&headline=${encodeURIComponent(post.title)}&label=Community`;
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <div className="inline-block text-xs font-black uppercase tracking-widest px-3 py-1 mb-6" style={{ background: "#2d4a2d", color: "white" }}>
          // Community
        </div>
        <h1 className="text-3xl leading-tight mb-4" style={{ color: "#1a1a1a", fontFamily: "var(--font-fraunces)", fontWeight: 700 }}>
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="text-base leading-relaxed mb-8" style={{ color: "#4a4a4a" }}>{post.excerpt}</p>
        )}
        <Link
          href={joinUrl}
          className="btn-press inline-block text-sm font-black uppercase px-8 py-4 text-white"
          style={{ background: "#2d4a2d", border: "2px solid #1a1a1a", boxShadow: "4px 4px 0 #1a1a1a" }}
        >
          Get Access — It's Free →
        </Link>
        <p className="text-xs mt-4" style={{ color: "#9a9a9a" }}>Just your email</p>
      </div>
    );
  }

  const components = makeComponents();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-10">

        {/* Main article */}
        <div className="flex-1 min-w-0">

          {/* Green header block */}
          <div className="mb-8" style={{ border: "2px solid #1a1a1a", boxShadow: "6px 6px 0 #1a1a1a" }}>
            <div className="p-8" style={{ background: "#2d4a2d" }}>
              {post.category && (
                <div className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: "#7ab87a" }}>
                  // {post.category}
                </div>
              )}
              <h1 className="leading-tight mb-4 text-white" style={{ fontSize: "2.25rem", fontFamily: "var(--font-fraunces)", fontWeight: 700 }}>
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="text-base leading-relaxed mb-5" style={{ color: "#c8e6c8" }}>
                  {post.excerpt}
                </p>
              )}
              <div className="flex items-center gap-3 text-xs font-medium" style={{ color: "#7ab87a" }}>
                {post.author && <span>{post.author}</span>}
                {post.author && <span>·</span>}
                <span>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              </div>
            </div>

            {post.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.image}
                alt={post.title}
                className="w-full object-cover"
                style={{ maxHeight: "420px", borderTop: "2px solid #1a1a1a", display: "block" }}
              />
            )}
          </div>

          {/* Key terms chips */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag: string) => (
                <span key={tag} className="text-xs font-black uppercase tracking-widest px-3 py-1" style={{ border: "2px solid #2d4a2d", color: "#2d4a2d", background: "white" }}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Body */}
          {post.body && (
            <div>
              <PortableText value={post.body} components={components} />
            </div>
          )}

          <CommentSection slug={slug} comments={comments} hasAccess={hasAccess} />

          <div className="mt-12 pt-8" style={{ borderTop: "2px solid #1a1a1a" }}>
            <a href="/" className="text-xs font-black uppercase tracking-widest" style={{ color: "#1a1a1a" }}>
              ← Back to all posts
            </a>
          </div>
        </div>

        {/* Sidebar */}
        {otherPosts.length > 0 && (
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="sticky top-6 overflow-hidden" style={{ border: "2px solid #1a1a1a", background: "white", boxShadow: "4px 4px 0 #1a1a1a" }}>
              <div className="px-5 py-4" style={{ background: "#f0ece0", borderBottom: "2px solid #1a1a1a" }}>
                <div className="text-xs font-black uppercase tracking-widest mb-0.5" style={{ color: "#2d4a2d" }}>// More Posts</div>
                <h2 className="font-black text-sm uppercase tracking-wide" style={{ color: "#1a1a1a" }}>Keep Reading</h2>
              </div>
              <div className="divide-y" style={{ borderColor: "#e8e4d8" }}>
                {otherPosts.map((p: { slug: string; title: string; excerpt?: string; date: string; category?: string; image?: string }) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="block p-4 hover:bg-stone-50 transition-colors">
                    {p.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image} alt={p.title} className="w-full object-cover mb-3" style={{ height: "100px", border: "1px solid #1a1a1a" }} />
                    )}
                    {p.category && (
                      <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: "#2d4a2d" }}>// {p.category}</div>
                    )}
                    <div className="text-sm font-bold leading-snug mb-1" style={{ color: "#1a1a1a" }}>{p.title}</div>
                    {p.excerpt && (
                      <div className="text-xs leading-relaxed" style={{ color: "#6b6b6b" }}>{p.excerpt}</div>
                    )}
                    <div className="text-xs mt-2 font-medium" style={{ color: "#9a9a9a" }}>
                      {new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

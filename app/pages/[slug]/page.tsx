import { client } from "@/sanity/lib/client";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { notFound } from "next/navigation";
import HtmlEmbed from "@/components/HtmlEmbed";
import SignupForm from "@/components/SignupForm";
import VocabTerm from "@/components/VocabTerm";

type Props = { params: Promise<{ slug: string }> };

async function getPage(slug: string) {
  return client.fetch(
    `*[_type == "page" && slug.current == $slug][0] {
      title, subtitle, wide,
      body[]{
        ...,
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

const components: PortableTextComponents = {
  types: {
    htmlEmbed: ({ value }) => <HtmlEmbed code={value?.code ?? ""} />,
    signupForm: ({ value }) => (
      <SignupForm cta={value?.cta} redirect={value?.redirect ?? "/thanks"} note={value?.note} tag={value?.tag} />
    ),
  },
  block: {
    normal: ({ children }) => (
      <p style={{ marginBottom: "1.5rem", lineHeight: "1.8", fontSize: "1.0625rem", color: "#2a2a2a" }}>{children}</p>
    ),
    h2: ({ children }) => (
      <h2 style={{ fontSize: "1.5rem", fontWeight: 900, textTransform: "uppercase", marginTop: "2.5rem", marginBottom: "1rem", color: "#1a1a1a" }}>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 style={{ fontSize: "1.2rem", fontWeight: 900, textTransform: "uppercase", marginTop: "2rem", marginBottom: "0.75rem", color: "#1a1a1a" }}>{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote style={{ borderLeft: "4px solid #2d4a2d", paddingLeft: "1.25rem", margin: "2rem 0", color: "#4a4a4a", fontStyle: "italic" }}>{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong style={{ fontWeight: 900 }}>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
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
    bullet: ({ children }) => <ul style={{ marginBottom: "1.5rem", paddingLeft: "1.5rem", listStyleType: "disc" }}>{children}</ul>,
    number: ({ children }) => <ol style={{ marginBottom: "1.5rem", paddingLeft: "1.5rem", listStyleType: "decimal" }}>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li style={{ marginBottom: "0.5rem", lineHeight: "1.7", color: "#2a2a2a" }}>{children}</li>,
    number: ({ children }) => <li style={{ marginBottom: "0.5rem", lineHeight: "1.7", color: "#2a2a2a" }}>{children}</li>,
  },
};

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) notFound();

  return (
    <div className={`${page.wide ? "max-w-5xl" : "max-w-2xl"} mx-auto px-6 py-12`}>
      <div className="mb-8 pb-6" style={{ borderBottom: "2px solid #1a1a1a" }}>
        {page.subtitle && (
          <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#2d4a2d" }}>
            // {page.subtitle}
          </div>
        )}
        <h1 className="text-4xl font-black uppercase leading-tight" style={{ color: "#1a1a1a" }}>
          {page.title}
        </h1>
      </div>

      {page.body && (
        <div>
          <PortableText value={page.body} components={components} />
        </div>
      )}

      <div className="mt-12 pt-8" style={{ borderTop: "2px solid #1a1a1a" }}>
        <a href="/" className="text-xs font-black uppercase tracking-widest" style={{ color: "#1a1a1a" }}>
          ← Back to home
        </a>
      </div>
    </div>
  );
}

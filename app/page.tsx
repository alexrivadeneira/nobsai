import Link from "next/link";
import { client } from "@/sanity/lib/client";
import SurveyInline from "@/components/SurveyInline";

export const revalidate = 60; // re-fetch from Sanity every 60 seconds

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string | null;
};

type Workshop = {
  _id: string;
  title: string;
  month: string;
  days: string;
  time: string;
  location: string;
  tier: string;
  price: string;
  registerUrl: string | null;
};

async function getPosts(): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      "slug": slug.current,
      title,
      excerpt,
      "date": coalesce(publishedAt, _createdAt),
      author,
      category,
      "image": coverImage.asset->url
    }`
  );
}

type ReadingLink = {
  _id: string;
  title: string;
  url: string;
  source: string | null;
  description: string | null;
};

async function getReadingList(): Promise<ReadingLink[]> {
  return client.fetch(
    `*[_type == "readingList"] | order(publishedAt desc) {
      _id, title, url, source, description
    }`
  );
}

async function getWorkshops(): Promise<Workshop[]> {
  return client.fetch(
    `*[_type == "workshop"] | order(date asc) {
      _id, title, month, days, time, location, tier, price, registerUrl
    }`
  );
}

type SiteSettings = {
  aboutTitle: string | null;
  aboutBody: string | null;
  aboutImage: string | null;
  aboutLinkLabel: string | null;
  aboutLinkUrl: string | null;
  heroLabel: string | null;
  heroHeadline: string | null;
  heroSubtext: string | null;
  heroLinkLabel: string | null;
  heroLinkUrl: string | null;
  heroImage: string | null;
};

async function getSiteSettings(): Promise<SiteSettings> {
  return client.fetch(
    `*[_type == "siteSettings"][0] {
      aboutTitle,
      aboutBody,
      "aboutImage": aboutImage.asset->url,
      aboutLinkLabel,
      aboutLinkUrl,
      heroLabel,
      heroHeadline,
      heroSubtext,
      heroLinkLabel,
      heroLinkUrl,
      "heroImage": heroImage.asset->url
    }`
  );
}


export default async function Home() {
  const [posts, workshops, settings, links] = await Promise.all([getPosts(), getWorkshops(), getSiteSettings(), getReadingList()]);
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-8 pb-4" style={{ borderBottom: "2px solid #1a1a1a" }}>
        <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: "#2d4a2d" }}>// Latest</div>
        <h1 className="text-4xl font-black uppercase tracking-tight" style={{ color: "#1a1a1a" }}>
          Blogs &amp; Resources
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <SurveyInline />
          <Hero settings={settings} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr mt-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>

        <div className="w-full lg:w-80 flex-shrink-0 space-y-6">
          <AboutSidebar settings={settings} />

          <Link href="/join?guide=true" className="flex flex-col items-center gap-1 group">
            <div className="text-sm font-black uppercase leading-snug group-hover:underline text-center" style={{ color: "#1a1a1a", textUnderlineOffset: "3px" }}>
              Get the free resource: Explain AI to Anyone →
            </div>
            <img src="/guide-icon.png" alt="Free guide" style={{ width: "75%", objectFit: "contain" }} />
          </Link>

          <WorkshopSidebar workshops={workshops} />
          <ReadingListSidebar links={links} />
        </div>
      </div>
    </div>
  );
}

function Hero({ settings }: { settings: SiteSettings | null }) {
  const label = settings?.heroLabel ?? "Announcement";
  const headline = settings?.heroHeadline ?? "New Workshop: AI for Business Owners — July 10–11 in NYC";
  const subtext = settings?.heroSubtext ?? "Two days of hands-on AI training for founders and operators. No fluff — just tools you can use Monday morning.";
  const linkLabel = settings?.heroLinkLabel ?? "Register now";
  const linkUrl = settings?.heroLinkUrl ?? "/register";
  const image = settings?.heroImage ?? "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80";

  return (
    <div className="relative overflow-hidden" style={{ height: "clamp(280px, 50vw, 360px)", border: "2px solid #1a1a1a", boxShadow: "6px 6px 0px #1a1a1a" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt={headline} className="w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }} />
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: "#7ab87a" }}>
          // {label}
        </div>
        <h2 className="text-white text-2xl leading-snug mb-2" style={{ fontFamily: "var(--font-fraunces)", fontWeight: 700 }}>
          {headline}
        </h2>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
          {subtext}{" "}
          {linkLabel && <a href={linkUrl} className="underline font-bold text-white hover:opacity-80">{linkLabel} →</a>}
        </p>
      </div>
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group h-full">
      <div className="overflow-hidden h-full flex flex-col transition-all" style={{ border: "2px solid #1a1a1a", background: "white", boxShadow: "4px 4px 0px #1a1a1a" }}>
        <div className="h-44 overflow-hidden flex-shrink-0" style={{ background: "#d8d0c0", borderBottom: "2px solid #1a1a1a" }}>
          {post.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
        </div>
        <div className="p-4 flex flex-col flex-1">
          {post.category && (
            <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#2d4a2d" }}>
              // {post.category}
            </div>
          )}
          <h2 className="text-base leading-snug mb-2" style={{ color: "#1a1a1a", fontFamily: "var(--font-fraunces)", fontWeight: 700 }}>
            {post.title}
          </h2>
          <p className="text-sm mb-3 leading-relaxed flex-1" style={{ color: "#4a4a4a" }}>
            {post.excerpt}
          </p>
          <div className="flex items-center gap-2 text-xs font-medium" style={{ color: "#6b6b6b" }}>
            <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
            {post.author && <><span>·</span><span>{post.author}</span></>}
          </div>
        </div>
      </div>
    </Link>
  );
}

function WorkshopSidebar({ workshops }: { workshops: Workshop[] }) {
  return (
    <div className="overflow-hidden" style={{ border: "2px solid #1a1a1a", background: "white", boxShadow: "4px 4px 0px #1a1a1a" }}>
      <div className="px-5 py-4" style={{ background: "#2d4a2d", borderBottom: "2px solid #1a1a1a" }}>
        <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: "#7ab87a" }}>// Upcoming</div>
        <h2 className="text-white font-black text-sm uppercase tracking-wide">In-Person Workshops</h2>
      </div>
      {workshops.length === 0 ? (
        <div className="px-5 py-8 text-center">
          <p className="text-sm leading-relaxed" style={{ color: "#4a4a4a" }}>This site's where I publish and capture signups; the in-person workshops are exactly what I'm building now, which is why I'm here.</p>
        </div>
      ) : (
        <div className="divide-y-2" style={{ borderColor: "#1a1a1a" }}>
          {workshops.map((w) => (
            <div key={w._id} className="flex items-center gap-3 px-4 py-3">
              <div className="flex-shrink-0 w-14 text-center p-1" style={{ background: "#f0ece0", border: "1px solid #1a1a1a" }}>
                <div className="text-xs font-black uppercase" style={{ color: "#2d4a2d" }}>{w.month}</div>
                <div className="text-sm font-black" style={{ color: "#1a1a1a" }}>{w.days}</div>
                <div className="text-xs" style={{ color: "#6b6b6b" }}>{w.time}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold uppercase mb-0.5" style={{ color: "#6b6b6b" }}>{w.location}</div>
                <div className="font-black text-sm leading-tight uppercase" style={{ color: "#1a1a1a" }}>{w.title}</div>
                <div className="text-xs mt-0.5" style={{ color: "#6b6b6b" }}>{w.tier}</div>
              </div>
              <div className="flex-shrink-0 text-right">
                <div className="font-black text-sm mb-1" style={{ color: "#2d4a2d" }}>{w.price}</div>
                <Link
                  href={w.registerUrl ?? "/register"}
                  className="text-xs px-2 py-1 font-black uppercase text-white block text-center"
                  style={{ background: "#2d4a2d", border: "1px solid #1a1a1a" }}
                >
                  Register
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AboutSidebar({ settings }: { settings: SiteSettings | null }) {
  const title = settings?.aboutTitle ?? "About Us";
  const body = settings?.aboutBody ?? "I'm a Meta and Salesforce engineer and educator, and now I teach AI in plain English.";
  const image = settings?.aboutImage ?? null;
  const linkLabel = settings?.aboutLinkLabel ?? null;
  const linkUrl = settings?.aboutLinkUrl ?? null;

  return (
    <div className="overflow-hidden" style={{ border: "2px solid #1a1a1a", background: "white", boxShadow: "4px 4px 0px #1a1a1a" }}>
      <div className="px-5 py-4" style={{ background: "#f0ece0", borderBottom: "2px solid #1a1a1a" }}>
        <div className="text-xs font-black uppercase tracking-widest mb-0.5" style={{ color: "#2d4a2d" }}>// About</div>
        <h2 className="font-black text-sm uppercase tracking-wide" style={{ color: "#1a1a1a" }}>{title}</h2>
      </div>
      <div className="p-4">
        {image && (
          <div className="overflow-hidden mb-3" style={{ height: "140px", border: "2px solid #1a1a1a" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={title} className="w-full h-full object-cover object-top" />
          </div>
        )}
        <p className="text-sm leading-relaxed mb-4" style={{ color: "#4a4a4a" }}>{body}</p>
        <img src="/creds.png" alt="Meta and Salesforce" className="w-full object-contain mb-4" />
        {linkLabel && linkUrl && (
          <Link
            href={linkUrl}
            className="inline-block text-xs font-black uppercase px-4 py-2"
            style={{ border: "2px solid #1a1a1a", color: "#1a1a1a", boxShadow: "2px 2px 0px #1a1a1a" }}
          >
            {linkLabel} →
          </Link>
        )}
      </div>
    </div>
  );
}

function ReadingListSidebar({ links }: { links: ReadingLink[] }) {
  if (links.length === 0) return null;
  return (
    <div className="overflow-hidden" style={{ border: "2px solid #1a1a1a", background: "white", boxShadow: "4px 4px 0px #1a1a1a" }}>
      <div className="px-5 py-4" style={{ background: "#f0ece0", borderBottom: "2px solid #1a1a1a" }}>
        <div className="text-xs font-black uppercase tracking-widest mb-0.5" style={{ color: "#2d4a2d" }}>// Reading List</div>
        <h2 className="font-black text-sm uppercase tracking-wide" style={{ color: "#1a1a1a" }}>Worth Your Time</h2>
      </div>
      <div className="divide-y" style={{ borderColor: "#e8e4d8" }}>
        {links.map((link) => (
          <a
            key={link._id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-5 py-3 hover:bg-stone-50 transition-colors"
          >
            <div className="text-sm font-bold leading-snug mb-0.5" style={{ color: "#1a1a1a" }}>{link.title}</div>
            {link.source && (
              <div className="text-xs font-medium" style={{ color: "#2d4a2d" }}>{link.source}</div>
            )}
            {link.description && (
              <div className="text-xs mt-0.5 leading-relaxed" style={{ color: "#6b6b6b" }}>{link.description}</div>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}

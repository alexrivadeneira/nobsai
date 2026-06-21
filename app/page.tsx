import Link from "next/link";
import { client } from "@/sanity/lib/client";

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
};

async function getSiteSettings(): Promise<SiteSettings> {
  return client.fetch(
    `*[_type == "siteSettings"][0] {
      aboutTitle,
      aboutBody,
      "aboutImage": aboutImage.asset->url,
      aboutLinkLabel
    }`
  );
}


export default async function Home() {
  const [posts, workshops, settings] = await Promise.all([getPosts(), getWorkshops(), getSiteSettings()]);
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1
        className="text-3xl font-bold text-center mb-10 uppercase tracking-widest"
        style={{ color: "#2d4a2d" }}
      >
        Latest Blogs &amp; Resources
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <Hero />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr mt-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>

        <div className="w-full lg:w-80 flex-shrink-0 space-y-6">
          <WorkshopSidebar workshops={workshops} />

          <AboutSidebar settings={settings} />
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="relative rounded-lg overflow-hidden" style={{ height: "320px" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80"
        alt="Hero"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }} />
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-3" style={{ background: "#2d4a2d", color: "white" }}>
          Announcement
        </div>
        <h2 className="text-white text-2xl font-bold leading-snug mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
          New Workshop: AI for Business Owners — July 10–11 in NYC
        </h2>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
          Two days of hands-on AI training built for founders and operators. No fluff, no theory — just tools you can use Monday morning. Spots are limited.{" "}
          <a href="/register" className="underline font-semibold text-white hover:opacity-80">Register now →</a>
        </p>
      </div>
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group h-full">
      <div className="rounded-lg overflow-hidden border hover:shadow-md transition-shadow h-full flex flex-col" style={{ borderColor: "#d4c9b0", background: "white" }}>
        <div className="h-44 overflow-hidden flex-shrink-0" style={{ background: "#e8e0d0" }}>
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
          <h2 className="font-bold text-base leading-snug mb-2" style={{ fontFamily: "var(--font-playfair)", color: "#1a1a1a" }}>
            {post.title}
          </h2>
          <p className="text-sm mb-3 leading-relaxed flex-1" style={{ color: "#6b6b6b" }}>
            {post.excerpt}
          </p>
          <div className="flex items-center gap-2 text-xs" style={{ color: "#6b6b6b" }}>
            <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
            <span>|</span>
            <span>Author {post.author}</span>
            <span>|</span>
            <span>{post.category}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function WorkshopSidebar({ workshops }: { workshops: Workshop[] }) {
  return (
    <div className="rounded-lg overflow-hidden border" style={{ borderColor: "#d4c9b0", background: "white" }}>
      <div className="px-5 py-4" style={{ background: "#2d4a2d" }}>
        <h2 className="text-white font-bold text-sm uppercase tracking-widest">Upcoming In-Person Workshops</h2>
        <p className="text-xs mt-1" style={{ color: "#8fb08f" }}>Hands-on AI training, in person.</p>
      </div>
      {workshops.length === 0 ? (
        <div className="px-5 py-8 text-center">
          <p className="text-sm font-semibold mb-1" style={{ color: "#2d4a2d" }}>Stay tuned</p>
          <p className="text-xs" style={{ color: "#6b6b6b" }}>New workshops are being scheduled. Check back soon.</p>
        </div>
      ) : (
        <div className="divide-y" style={{ borderColor: "#f0ebe0" }}>
          {workshops.map((w) => (
            <div key={w._id} className="flex items-center gap-3 px-4 py-3">
              <div className="flex-shrink-0 w-14 text-center rounded p-1" style={{ background: "#f5f0e8" }}>
                <div className="text-xs font-bold uppercase" style={{ color: "#2d4a2d" }}>{w.month}</div>
                <div className="text-sm font-bold" style={{ color: "#2d4a2d" }}>{w.days}</div>
                <div className="text-xs" style={{ color: "#6b6b6b" }}>{w.time}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs mb-0.5" style={{ color: "#6b6b6b" }}>Location: {w.location}</div>
                <div className="font-semibold text-sm leading-tight" style={{ color: "#1a1a1a" }}>{w.title}</div>
                <div className="text-xs mt-0.5" style={{ color: "#6b6b6b" }}>{w.tier}</div>
              </div>
              <div className="flex-shrink-0 text-right">
                <div className="font-bold text-sm" style={{ color: "#2d4a2d" }}>{w.price}</div>
                <Link
                  href={w.registerUrl ?? "/register"}
                  className="text-xs px-2 py-1 rounded text-white block mt-1 text-center"
                  style={{ background: "#2d4a2d" }}
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
  const title = settings?.aboutTitle ?? "About NoBSAI";
  const body = settings?.aboutBody ?? "Straight talk on AI for people building real things. No hype, no fluff — just what actually works.";
  const image = settings?.aboutImage ?? null;
  const linkLabel = settings?.aboutLinkLabel ?? "Learn More";

  return (
    <div className="rounded-lg overflow-hidden border" style={{ borderColor: "#d4c9b0", background: "white" }}>
      <div className="px-5 py-4" style={{ background: "#f5f0e8", borderBottom: "1px solid #d4c9b0" }}>
        <h2 className="font-bold text-sm uppercase tracking-widest" style={{ color: "#2d4a2d" }}>{title}</h2>
      </div>
      <div className="p-4">
        {image && (
          <div className="h-36 rounded overflow-hidden mb-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={title} className="w-full h-full object-cover object-top" />
          </div>
        )}
        <p className="text-sm leading-relaxed mb-3" style={{ color: "#6b6b6b" }}>{body}</p>
        <Link
          href="/about"
          className="inline-block text-xs font-semibold px-4 py-2 rounded border"
          style={{ borderColor: "#2d4a2d", color: "#2d4a2d" }}
        >
          {linkLabel}
        </Link>
      </div>
    </div>
  );
}

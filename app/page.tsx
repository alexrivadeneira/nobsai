import Link from "next/link";

const posts = [
  {
    slug: "mastering-ai-prompts",
    title: "Mastering AI Prompts for Real Work",
    excerpt: "Cut through the noise and learn the prompting techniques that actually move the needle — no PhD required.",
    date: "Jun 15, 2025",
    author: "Alex",
    category: "Prompting",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
  },
  {
    slug: "building-ai-workflows",
    title: "Building Authentic AI Workflows That Stick",
    excerpt: "Most AI workflows fail because they're built for demos, not daily use. Here's how to build ones that last.",
    date: "Jun 10, 2025",
    author: "Alex",
    category: "Workflows",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  },
  {
    slug: "why-hands-on-ai",
    title: "Why Hands-On AI Skills Are Making a Comeback",
    excerpt: "Since 2018, we've watched automation hype come and go. What remains is the value of knowing how to actually use these tools.",
    date: "Jun 5, 2025",
    author: "Alex",
    category: "Opinion",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80",
  },
  {
    slug: "no-fluff-chatgpt",
    title: "No-Fluff Guide to ChatGPT for Business",
    excerpt: "Skip the hype. Here's what ChatGPT is actually good at in a business context and where it will waste your time.",
    date: "May 28, 2025",
    author: "Alex",
    category: "Tools",
    image: "https://images.unsplash.com/photo-1676299081847-824916de030a?w=600&q=80",
  },
  {
    slug: "create-sops-with-ai",
    title: "Create SOPs With AI in Half the Time",
    excerpt: "Standard operating procedures don't have to take forever. Here's a repeatable system using AI to get them done fast.",
    date: "May 20, 2025",
    author: "Alex",
    category: "Productivity",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
  },
  {
    slug: "ai-growth-strategy",
    title: "Why AI Is Central to Any Growth Strategy Now",
    excerpt: "Companies ignoring AI in their growth strategy are already behind. Here's how to think about it without the buzzwords.",
    date: "May 12, 2025",
    author: "Alex",
    category: "Strategy",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80",
  },
];

const workshops = [
  { month: "Jul", days: "10–11", time: "2:00 PM", location: "NYC", title: "AI for Business Owners", tier: "Premium", price: "$300" },
  { month: "Aug", days: "5", time: "6:00 PM", location: "LA", title: "Prompt Engineering Intensive", tier: "Premium", price: "$300" },
  { month: "Aug", days: "12", time: "3:00 PM", location: "LA", title: "AI Workflows Workshop", tier: "Premium", price: "$300" },
  { month: "Sep", days: "3–5", time: "3:00 PM", location: "LA", title: "Deep Dive: AI Strategy", tier: "Premium", price: "$300" },
  { month: "Sep", days: "5", time: "6:00 PM", location: "LA", title: "Writing With AI", tier: "Short", price: "$200" },
];

export default function Home() {
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
          <AboutSidebar />
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

function PostCard({ post }: { post: (typeof posts)[0] }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group h-full">
      <div className="rounded-lg overflow-hidden border hover:shadow-md transition-shadow h-full flex flex-col" style={{ borderColor: "#d4c9b0", background: "white" }}>
        <div className="h-44 overflow-hidden flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 flex flex-col flex-1">
          <h2 className="font-bold text-base leading-snug mb-2" style={{ fontFamily: "var(--font-playfair)", color: "#1a1a1a" }}>
            {post.title}
          </h2>
          <p className="text-sm mb-3 leading-relaxed flex-1" style={{ color: "#6b6b6b" }}>
            {post.excerpt}
          </p>
          <div className="flex items-center gap-2 text-xs" style={{ color: "#6b6b6b" }}>
            <span>{post.date}</span>
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

type Workshop = { month: string; days: string; time: string; location: string; title: string; tier: string; price: string };
function WorkshopSidebar({ workshops }: { workshops: Workshop[] }) {
  return (
    <div className="rounded-lg overflow-hidden border" style={{ borderColor: "#d4c9b0", background: "white" }}>
      <div className="px-5 py-4" style={{ background: "#2d4a2d" }}>
        <h2 className="text-white font-bold text-sm uppercase tracking-widest">Upcoming In-Person Workshops</h2>
        <p className="text-xs mt-1" style={{ color: "#8fb08f" }}>Hands-on AI training, in person.</p>
      </div>
      <div className="divide-y" style={{ borderColor: "#f0ebe0" }}>
        {workshops.map((w, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3">
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
                href="/register"
                className="text-xs px-2 py-1 rounded text-white block mt-1 text-center"
                style={{ background: "#2d4a2d" }}
              >
                Register
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutSidebar() {
  return (
    <div className="rounded-lg overflow-hidden border" style={{ borderColor: "#d4c9b0", background: "white" }}>
      <div className="px-5 py-4" style={{ background: "#f5f0e8", borderBottom: "1px solid #d4c9b0" }}>
        <h2 className="font-bold text-sm uppercase tracking-widest" style={{ color: "#2d4a2d" }}>About NoBSAI</h2>
      </div>
      <div className="p-4">
        <div className="h-28 rounded overflow-hidden mb-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80"
            alt="Team"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-sm leading-relaxed mb-3" style={{ color: "#6b6b6b" }}>
          Straight talk on AI for people building real things. No hype, no fluff — just what actually works.
        </p>
        <Link
          href="/about"
          className="inline-block text-xs font-semibold px-4 py-2 rounded border"
          style={{ borderColor: "#2d4a2d", color: "#2d4a2d" }}
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}

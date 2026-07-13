import Link from "next/link";
import { client } from "@/sanity/lib/client";
import SurveyInline from "@/components/SurveyInline";
import HeroCarousel, { type HeroSlide } from "@/components/HeroCarousel";
import AskProblemForm from "@/components/AskProblemForm";

export const revalidate = 60; // re-fetch from Sanity every 60 seconds

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string | null;
  href?: string;
  ribbon?: string | null;
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
    `*[_type == "post"] | order(coalesce(publishedAt, _createdAt) desc) {
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

async function getHomePages(): Promise<Post[]> {
  const pages = await client.fetch(
    `*[_type == "page" && showOnHome == true] {
      "slug": slug.current,
      title,
      excerpt,
      "date": _createdAt,
      category,
      ribbon,
      "image": coverImage.asset->url
    }`
  );
  return pages.map((p: Post) => ({ ...p, author: "", href: `/pages/${p.slug}` }));
}

type DigestTeaser = {
  date: string;
  topSummary: string | null;
  items: { _key: string; headline: string }[];
} | null;

async function getLatestDigest(): Promise<DigestTeaser> {
  return client.fetch(
    `*[_type == "digest"] | order(date desc) [0] {
      date,
      topSummary,
      items[] { _key, headline }
    }`
  );
}

type AnsweredQuestion = {
  _id: string;
  displayQuestion: string | null;
  question: string;
  answerLabel: string | null;
  answerUrl: string | null;
};

async function getAnsweredQuestions(): Promise<AnsweredQuestion[]> {
  return client.fetch(
    `*[_type == "aiQuestion" && answered == true] | order(submittedAt desc) [0...3] {
      _id, displayQuestion, question, answerLabel, answerUrl
    }`
  );
}

async function getHeroSlides(): Promise<HeroSlide[]> {
  return client.fetch(
    `*[_type == "heroSlide" && enabled != false] | order(order asc) {
      _id,
      label,
      headline,
      subtext,
      linkLabel,
      linkUrl,
      "image": image.asset->url
    }`
  );
}


export default async function Home() {
  const [posts, homePages, workshops, links, heroSlides, digest, answeredQuestions] = await Promise.all([getPosts(), getHomePages(), getWorkshops(), getReadingList(), getHeroSlides(), getLatestDigest(), getAnsweredQuestions()]);
  const gridItems = [...posts, ...homePages].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return (
    <>
    <div className="max-w-6xl mx-auto px-6 py-12">
      <HeroSection />

      <OfficeHoursSection />

      <div className="mb-8 pb-4" style={{ borderBottom: "2px solid #1a1a1a" }}>
        <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: "#2d4a2d" }}>// Latest</div>
        <h1 className="text-4xl font-black uppercase tracking-tight" style={{ color: "#1a1a1a" }}>
          Blogs &amp; Resources
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <SurveyInline />
          <HeroCarousel slides={heroSlides} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr mt-6">
            {gridItems.map((post) => (
              <PostCard key={post.href ?? post.slug} post={post} />
            ))}
          </div>
        </div>

        <div className="w-full lg:w-80 flex-shrink-0 space-y-6">
          <Link href="/join?guide=true" className="flex flex-col items-center gap-1 group">
            <div className="text-sm font-black uppercase leading-snug group-hover:underline text-center" style={{ color: "#1a1a1a", textUnderlineOffset: "3px" }}>
              Get the free resource: Explain AI to Anyone →
            </div>
            <img src="/guide-icon.png" alt="Free guide" style={{ width: "75%", objectFit: "contain" }} />
          </Link>

          <DigestSidebar digest={digest} />
          <WorkshopSidebar workshops={workshops} />
          <ReadingListSidebar links={links} />
        </div>
      </div>
    </div>
    <AskSection answeredQuestions={answeredQuestions} />
    </>
  );
}

function AskSection({ answeredQuestions }: { answeredQuestions: AnsweredQuestion[] }) {
  return (
    <section id="ask" className="w-full" style={{ background: "#1e3a26", borderTop: "2px solid #1a1a1a", borderBottom: "2px solid #1a1a1a" }}>
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#e8a33d" }}>// Ask</div>
        <h2 className="text-3xl md:text-4xl mb-3" style={{ color: "#f5f0e8", fontFamily: "var(--font-fraunces)", fontWeight: 900, letterSpacing: "0.02em", textTransform: "uppercase" }}>
          Ask Me Your AI Problem
        </h2>
        <p className="text-base leading-relaxed mb-8 max-w-xl" style={{ color: "#d8d0c0", fontFamily: "var(--font-fraunces)" }}>
          Got a task you suspect AI could do &mdash; but don&apos;t know where to start? Describe it. I answer every one.
        </p>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 max-w-xl">
            <AskProblemForm />
          </div>

          <div className="flex-1 space-y-6">
            <ul className="space-y-4">
              {[
                "Quick ones get answered in the daily digest",
                "Meaty ones become a full walkthrough post",
                "The best ones get built live at Saturday office hours",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-base" style={{ color: "#f5f0e8", fontFamily: "var(--font-fraunces)" }}>
                  <span aria-hidden style={{ color: "#e8a33d" }}>&rarr;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {answeredQuestions.length > 0 && (
              <div className="p-5" style={{ border: "2px solid #e8a33d", background: "#16301d" }}>
                <div className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: "#e8a33d" }}>Recently Answered</div>
                <div className="space-y-3">
                  {answeredQuestions.map((q) => (
                    <p key={q._id} className="text-sm leading-relaxed" style={{ color: "#f5f0e8", fontFamily: "var(--font-fraunces)" }}>
                      &ldquo;{q.displayQuestion ?? q.question}&rdquo; &rarr;{" "}
                      {q.answerUrl ? (
                        <a href={q.answerUrl} className="underline" style={{ textUnderlineOffset: "3px" }}>
                          {q.answerLabel ?? "Read the answer"}
                        </a>
                      ) : (
                        <span>{q.answerLabel}</span>
                      )}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroSection() {
  const highlight = {
    color: "#2d4a2d",
    boxShadow: "inset 0 -0.18em 0 0 #e8a33d",
    paddingBottom: "0.06em",
  };
  return (
    <div className="mb-12 py-10">
      <h1
        className="text-4xl md:text-5xl leading-tight mb-6 max-w-3xl"
        style={{ color: "#1a1a1a", fontFamily: "var(--font-fraunces)", fontWeight: 900 }}
      >
        Go from AI-curious to <span style={highlight}>running your own agents</span>. No code. No hype.
      </h1>
      <p className="text-lg leading-relaxed mb-8 max-w-xl" style={{ color: "#4a4a4a", fontFamily: "var(--font-fraunces)", fontWeight: 400 }}>
        A step-by-step path, live help every Saturday, in-person workshops, and plain-English answers
        to your actual questions &hellip; from someone who&apos;s taught real people, not just written about it.
      </p>
      <div className="flex flex-wrap gap-4">
        <Link
          href="#"
          className="btn-press text-sm font-black px-6 py-3"
          style={{ background: "#e8a33d", color: "#1a1a1a", border: "2px solid #1a1a1a", boxShadow: "4px 4px 0px #1a1a1a", fontFamily: "monospace" }}
        >
          Start the path &rarr;
        </Link>
        <Link
          href="#ask"
          className="btn-press text-sm font-black px-6 py-3"
          style={{ background: "#f0ece0", color: "#1a1a1a", border: "2px solid #1a1a1a", boxShadow: "4px 4px 0px #1a1a1a", fontFamily: "monospace" }}
        >
          Ask me your AI problem
        </Link>
      </div>
    </div>
  );
}

function getNextSaturday(): Date {
  const now = new Date();
  const day = now.getDay(); // 0 = Sun ... 6 = Sat
  const diff = (6 - day + 7) % 7; // 0 if today is already Saturday
  const result = new Date(now);
  result.setDate(now.getDate() + diff);
  return result;
}

function OfficeHoursSection() {
  const dateLabel = getNextSaturday().toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mb-12">
      <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: "#2d4a2d" }}>// Every Saturday</div>
      <h2 className="text-4xl font-black uppercase tracking-tight mb-4" style={{ color: "#1a1a1a" }}>
        Office Hours
      </h2>

      <div className="flex flex-col md:flex-row overflow-hidden" style={{ border: "2px solid #1a1a1a", boxShadow: "6px 6px 0px #1a1a1a" }}>
        <div className="flex-1 p-8" style={{ background: "#e8a33d", borderBottom: "2px solid #1a1a1a" }}>
          <h3 className="text-2xl md:text-3xl font-black leading-tight mb-3" style={{ color: "#1a1a1a" }}>
            Bring an idea. Work through bringing it to life.
          </h3>
          <div className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: "#1a1a1a" }}>
            Saturdays &middot; 11:00 AM PST &middot; Live on Zoom &middot; Free
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "#2a2200" }}>
            Show up with a problem (want to automate some process at your small business, accelerate
            your work, have a killer app idea, or just want to solve some problem?) and we can work together
            on screen. Watch other people building even if you don&apos;t bring an idea.
          </p>
        </div>

        <div className="w-full md:w-72 flex-shrink-0 flex items-center justify-center p-6" style={{ background: "white" }}>
          <div className="w-full p-5 text-center" style={{ border: "2px solid #1a1a1a" }}>
            <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#2d4a2d" }}>Next Session</div>
            <div className="text-xl font-black mb-4" style={{ color: "#1a1a1a" }}>{dateLabel}</div>
            <a
              href="/api/zoom"
              className="btn-press block w-full py-3 text-sm font-black uppercase tracking-wide"
              style={{ border: "2px solid #1a1a1a", color: "#1a1a1a", boxShadow: "3px 3px 0px #1a1a1a" }}
            >
              Get the Zoom link
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <Link href={post.href ?? `/blog/${post.slug}`} className="block group h-full">
      <div className="relative overflow-hidden h-full flex flex-col transition-all" style={{ border: "2px solid #1a1a1a", background: "white", boxShadow: "4px 4px 0px #1a1a1a" }}>
        {post.ribbon && (
          <div
            className="absolute z-10 text-center text-xs font-black uppercase tracking-widest text-white"
            style={{
              top: "22px",
              right: "-38px",
              width: "160px",
              transform: "rotate(45deg)",
              background: "#2d4a2d",
              padding: "5px 0",
              border: "1px solid #1a1a1a",
              boxShadow: "0 2px 0 rgba(26,26,26,0.35)",
            }}
          >
            {post.ribbon}
          </div>
        )}
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
                  className="btn-press text-xs px-2 py-1 font-black uppercase text-white block text-center"
                  style={{ background: "#2d4a2d", border: "1px solid #1a1a1a", boxShadow: "2px 2px 0px #1a1a1a" }}
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

function DigestSidebar({ digest }: { digest: DigestTeaser }) {
  if (!digest || !digest.items?.length) return null;
  const dateLabel = new Date(digest.date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return (
    <div className="overflow-hidden" style={{ border: "2px solid #1a1a1a", background: "white", boxShadow: "4px 4px 0px #1a1a1a" }}>
      <div className="px-5 py-4" style={{ background: "#2d4a2d", borderBottom: "2px solid #1a1a1a" }}>
        <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: "#7ab87a" }}>// {dateLabel}</div>
        <h2 className="text-white font-black text-sm uppercase tracking-wide">Today in AI</h2>
      </div>
      {digest.topSummary && (
        <p className="px-5 pt-3 text-sm leading-relaxed" style={{ color: "#4a4a4a", fontFamily: "var(--font-fraunces)" }}>
          {digest.topSummary}
        </p>
      )}
      <ul className="px-5 py-3 divide-y" style={{ borderColor: "#e8e4d8" }}>
        {digest.items.slice(0, 3).map((item) => (
          <li key={item._key} className="py-2 text-sm font-bold leading-snug" style={{ color: "#1a1a1a" }}>
            {item.headline}
          </li>
        ))}
      </ul>
      <div className="px-5 pb-4">
        <Link
          href="/digest"
          className="btn-press inline-block text-xs font-black uppercase px-3 py-1.5"
          style={{ border: "2px solid #1a1a1a", color: "#1a1a1a", boxShadow: "2px 2px 0px #1a1a1a" }}
        >
          Read the full digest →
        </Link>
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

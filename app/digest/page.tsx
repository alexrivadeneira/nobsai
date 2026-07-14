import Link from "next/link";
import { client } from "@/sanity/lib/client";

export const revalidate = 60;

export async function generateMetadata() {
  const latest = await client.fetch<{ date: string; topSummary: string | null } | null>(
    `*[_type == "digest"] | order(date desc)[0]{ date, topSummary }`
  );
  const dateLabel = latest?.date ? formatDate(latest.date) : null;
  return {
    title: dateLabel ? `AI News Digest — ${dateLabel}` : "AI News Digest",
    description:
      latest?.topSummary?.slice(0, 180) ??
      "A daily, hype-free digest of AI news in plain English.",
  };
}

type DigestItem = {
  _key: string;
  headline: string;
  summary: string | null;
  url: string | null;
  source: string | null;
};

type Digest = {
  _id: string;
  date: string;
  topSummary: string | null;
  items: DigestItem[];
};

async function getDigests(): Promise<Digest[]> {
  return client.fetch(
    `*[_type == "digest"] | order(date desc) [0...14] {
      _id, date, topSummary, items
    }`
  );
}

function formatDate(date: string) {
  return new Date(date + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function DigestPage() {
  const digests = await getDigests();
  const [latest, ...older] = digests;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-8 pb-4" style={{ borderBottom: "2px solid #1a1a1a" }}>
        <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: "#2d4a2d" }}>// Daily</div>
        <h1 className="text-4xl font-black uppercase tracking-tight" style={{ color: "#1a1a1a" }}>
          AI News Digest
        </h1>
        <p className="text-sm mt-2 leading-relaxed" style={{ color: "#4a4a4a" }}>
          What actually happened in AI, in plain English. No hype, no hot takes. Updated every morning.
        </p>
      </div>

      {!latest ? (
        <p className="text-sm" style={{ color: "#4a4a4a" }}>No digest yet — check back tomorrow morning.</p>
      ) : (
        <>
          <DigestCard digest={latest} highlight />
          {older.length > 0 && (
            <div className="mt-10">
              <div className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: "#2d4a2d" }}>// Previous days</div>
              <div className="space-y-8">
                {older.map((d) => (
                  <DigestCard key={d._id} digest={d} />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <div className="mt-12 pt-6 text-center" style={{ borderTop: "2px solid #1a1a1a" }}>
        <Link
          href="/join"
          className="btn-press inline-block text-xs font-black uppercase px-4 py-2"
          style={{ border: "2px solid #1a1a1a", color: "#1a1a1a", boxShadow: "2px 2px 0px #1a1a1a" }}
        >
          Want this explained live? Join a workshop →
        </Link>
      </div>
    </div>
  );
}

function DigestCard({ digest, highlight = false }: { digest: Digest; highlight?: boolean }) {
  return (
    <div className="overflow-hidden" style={{ border: "2px solid #1a1a1a", background: "white", boxShadow: "4px 4px 0px #1a1a1a" }}>
      <div className="px-5 py-4" style={{ background: highlight ? "#2d4a2d" : "#f0ece0", borderBottom: "2px solid #1a1a1a" }}>
        {highlight && <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: "#7ab87a" }}>// Today</div>}
        <h2 className="font-black text-sm uppercase tracking-wide" style={{ color: highlight ? "white" : "#1a1a1a" }}>
          {formatDate(digest.date)}
        </h2>
      </div>
      {digest.topSummary && (
        <div className="px-5 py-4" style={{ background: "#f0ece0", borderBottom: "2px solid #1a1a1a" }}>
          <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: "#2d4a2d" }}>// The Big Picture</div>
          <p className="text-base leading-relaxed" style={{ color: "#1a1a1a", fontFamily: "var(--font-fraunces)", fontWeight: 500 }}>
            {digest.topSummary}
          </p>
        </div>
      )}
      <div className="divide-y-2" style={{ borderColor: "#e8e4d8" }}>
        {digest.items?.map((item) => (
          <div key={item._key} className="px-5 py-4">
            <h3 className="text-base leading-snug mb-1" style={{ color: "#1a1a1a", fontFamily: "var(--font-fraunces)", fontWeight: 700 }}>
              {item.headline}
            </h3>
            {item.summary && (
              <p className="text-sm leading-relaxed mb-2" style={{ color: "#4a4a4a" }}>{item.summary}</p>
            )}
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-black uppercase tracking-wide hover:underline"
                style={{ color: "#2d4a2d", textUnderlineOffset: "3px" }}
              >
                {item.source ? `Read at ${item.source}` : "Read the source"} →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

import { client } from "@/sanity/lib/client";

export const revalidate = 60;

type Video = {
  _id: string;
  title: string;
  description: string | null;
  vimeoId: string;
  publishedAt: string | null;
};

async function getVideos(): Promise<Video[]> {
  return client.fetch(
    `*[_type == "video"] | order(publishedAt desc) {
      _id, title, description, vimeoId, publishedAt
    }`
  );
}

export default async function VideosPage() {
  const videos = await getVideos();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8 pb-4" style={{ borderBottom: "2px solid #1a1a1a" }}>
        <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: "#2d4a2d" }}>// Watch</div>
        <h1 className="text-4xl font-black uppercase tracking-tight" style={{ color: "#1a1a1a" }}>Videos</h1>
      </div>

      {videos.length === 0 ? (
        <div className="py-16 text-center" style={{ border: "2px solid #1a1a1a", background: "white", boxShadow: "4px 4px 0 #1a1a1a" }}>
          <p className="font-black uppercase text-lg mb-2" style={{ color: "#2d4a2d" }}>Stay Tuned</p>
          <p className="text-sm" style={{ color: "#6b6b6b" }}>Videos are coming soon. Check back shortly.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {videos.map((v) => (
            <div key={v._id} style={{ border: "2px solid #1a1a1a", background: "white", boxShadow: "4px 4px 0 #1a1a1a" }}>
              {/* 16:9 Vimeo embed */}
              <div style={{ padding: "56.25% 0 0 0", position: "relative", borderBottom: "2px solid #1a1a1a" }}>
                <iframe
                  src={`https://player.vimeo.com/video/${v.vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479`}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                  title={v.title}
                />
              </div>
              <div className="p-6">
                <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#2d4a2d" }}>// Video</div>
                <h2 className="text-xl font-black uppercase tracking-tight mb-2" style={{ color: "#1a1a1a" }}>{v.title}</h2>
                {v.description && (
                  <p className="text-sm leading-relaxed" style={{ color: "#4a4a4a" }}>{v.description}</p>
                )}
                {v.publishedAt && (
                  <p className="text-xs mt-3 font-medium" style={{ color: "#6b6b6b" }}>
                    {new Date(v.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </p>
                )}
              </div>
            </div>
          ))}
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

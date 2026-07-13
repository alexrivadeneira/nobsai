/**
 * Renders a Bunny Stream video as a responsive 16:9 embed,
 * styled to match the site's black border + hard shadow.
 *
 * The library ID is shared across all videos and read from
 * NEXT_PUBLIC_BUNNY_LIBRARY_ID. Each embed only needs the per-video
 * GUID (the long id in the video's embed URL / Bunny dashboard).
 */
export default function BunnyVideo({
  videoId,
  caption,
  title,
}: {
  videoId?: string;
  caption?: string;
  title?: string;
}) {
  const libraryId = process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID;

  if (!libraryId || !videoId) {
    return (
      <div
        style={{
          margin: "2rem 0",
          padding: "1rem",
          border: "2px dashed #1a1a1a",
          background: "#f0ece0",
          fontSize: "0.875rem",
          color: "#6b6b6b",
        }}
      >
        {!libraryId
          ? "Bunny Stream library not configured yet (set NEXT_PUBLIC_BUNNY_LIBRARY_ID)."
          : "Add a Bunny video ID to show this video."}
      </div>
    );
  }

  const src = `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}?autoplay=false&loop=false&muted=false&preload=true&responsive=true`;

  return (
    <div style={{ margin: "2rem 0" }}>
      <div
        style={{
          position: "relative",
          paddingBottom: "56.25%",
          height: 0,
          border: "2px solid #1a1a1a",
          boxShadow: "4px 4px 0 #1a1a1a",
        }}
      >
        <iframe
          src={src}
          title={title ?? "Video"}
          loading="lazy"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen
        />
      </div>
      {caption && (
        <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#6b6b6b", fontStyle: "italic" }}>{caption}</p>
      )}
    </div>
  );
}

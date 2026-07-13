"use client";
import { useState } from "react";
import Link from "next/link";

type Comment = { _id: string; name: string; body: string; submittedAt: string };

type Props = {
  slug: string;
  comments: Comment[];
  hasAccess: boolean;
};

export default function CommentSection({ slug, comments, hasAccess }: Props) {
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");
    const res = await fetch("/api/comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postSlug: slug, name, body }),
    });
    const data = await res.json();
    setSending(false);
    if (data.success) {
      setDone(true);
      setName("");
      setBody("");
    } else {
      setError(data.error ?? "Something went wrong");
    }
  }

  return (
    <div className="mt-16" style={{ borderTop: "2px solid #1a1a1a", paddingTop: "2rem" }}>
      <div className="text-xs font-black uppercase tracking-widest mb-6" style={{ color: "#2d4a2d" }}>
        // Comments
      </div>

      {comments.length > 0 && (
        <div className="space-y-5 mb-10">
          {comments.map((c) => (
            <div key={c._id} className="p-4" style={{ border: "2px solid #1a1a1a", background: "white", boxShadow: "3px 3px 0 #1a1a1a" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-black" style={{ color: "#1a1a1a" }}>{c.name}</span>
                <span className="text-xs" style={{ color: "#9a9a9a" }}>
                  {new Date(c.submittedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#2a2a2a" }}>{c.body}</p>
            </div>
          ))}
        </div>
      )}

      {!hasAccess ? (
        <div className="p-5 text-center" style={{ border: "2px solid #1a1a1a", background: "#f0ece0" }}>
          <p className="text-sm mb-3" style={{ color: "#4a4a4a" }}>Join the list to leave a comment.</p>
          <Link
            href={`/join?redirect=/blog/${slug}`}
            className="btn-press inline-block text-xs font-black uppercase px-5 py-2 text-white"
            style={{ background: "#2d4a2d", border: "2px solid #1a1a1a", boxShadow: "2px 2px 0 #1a1a1a" }}
          >
            Join free →
          </Link>
        </div>
      ) : done ? (
        <p className="text-sm font-black uppercase" style={{ color: "#2d4a2d" }}>
          Thanks! Your comment is pending approval.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest mb-1" style={{ color: "#6b6b6b" }}>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm"
              style={{ border: "2px solid #1a1a1a", background: "white" }}
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest mb-1" style={{ color: "#6b6b6b" }}>Comment</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              rows={4}
              className="w-full px-3 py-2 text-sm resize-none"
              style={{ border: "2px solid #1a1a1a", background: "white" }}
            />
          </div>
          {error && <p className="text-xs" style={{ color: "#c0392b" }}>{error}</p>}
          <button
            type="submit"
            disabled={sending}
            className="btn-press text-xs font-black uppercase px-5 py-3 text-white"
            style={{ background: "#2d4a2d", border: "2px solid #1a1a1a", boxShadow: "2px 2px 0 #1a1a1a" }}
          >
            {sending ? "Submitting..." : "Post comment →"}
          </button>
        </form>
      )}
    </div>
  );
}

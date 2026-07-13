import Link from "next/link";

export const metadata = { title: "You're on the list" };

type Props = { searchParams: Promise<{ label?: string; headline?: string; body?: string }> };

export default async function ThanksPage({ searchParams }: Props) {
  const params = await searchParams;
  const label = params.label ?? "You're in";
  const headline = params.headline ?? "Thank you!";
  const body = params.body ?? "You're on the list. Keep an eye on your inbox — the details are on the way.";
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16" style={{ background: "#f0ece0" }}>
      <div className="w-full max-w-lg text-center" style={{ border: "2px solid #1a1a1a", background: "white", boxShadow: "6px 6px 0 #1a1a1a" }}>
        <div className="p-8" style={{ borderBottom: "2px solid #1a1a1a", background: "#2d4a2d" }}>
          <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#7ab87a" }}>{"// "}{label}</div>
          <h1 className="text-2xl leading-tight text-white" style={{ fontFamily: "var(--font-fraunces)", fontWeight: 700 }}>
            {headline}
          </h1>
        </div>
        <div className="p-8">
          <p className="text-sm leading-relaxed mb-6" style={{ color: "#4a4a4a" }}>
            {body}
          </p>
          <Link
            href="/"
            className="btn-press inline-block text-xs font-black uppercase px-4 py-2"
            style={{ border: "2px solid #1a1a1a", color: "#1a1a1a", boxShadow: "2px 2px 0px #1a1a1a" }}
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

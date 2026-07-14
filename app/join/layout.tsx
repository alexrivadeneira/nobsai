import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get the free guide",
  description:
    "Explain AI to Anyone — a free, plain-English guide to understanding and talking about AI with confidence.",
};

export default function JoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

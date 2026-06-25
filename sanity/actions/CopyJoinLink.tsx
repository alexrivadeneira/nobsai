import { DocumentActionProps, useDocumentOperation } from "sanity";

export function CopyJoinLinkAction(props: DocumentActionProps) {
  const doc = props.draft ?? props.published;

  if (props.type !== "post") return null;

  const slug = (doc?.slug as { current?: string })?.current;
  const title = doc?.title as string | undefined;

  return {
    label: "Copy Join Link",
    icon: () => "🔗",
    onHandle: () => {
      if (!slug) {
        alert("Save and publish the post first to get a slug.");
        return;
      }
      const base = "https://www.nobsai.tech";
      const params = new URLSearchParams({
        redirect: `/blog/${slug}`,
        ...(title ? { headline: title } : {}),
        label: "Community",
      });
      navigator.clipboard.writeText(`${base}/join?${params.toString()}`);
      props.onComplete();
    },
  };
}

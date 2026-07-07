"use client";

import { useEffect, useRef } from "react";

/**
 * Renders raw HTML from Sanity and executes any <script> tags.
 * Scripts inserted via innerHTML don't run, so we re-create each
 * script element, which causes the browser to execute it.
 */
export default function HtmlEmbed({ code }: { code: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    container.innerHTML = code;

    const scripts = Array.from(container.querySelectorAll("script"));
    for (const oldScript of scripts) {
      const newScript = document.createElement("script");
      for (const attr of Array.from(oldScript.attributes)) {
        newScript.setAttribute(attr.name, attr.value);
      }
      newScript.textContent = oldScript.textContent;
      oldScript.replaceWith(newScript);
    }

    return () => {
      container.innerHTML = "";
    };
  }, [code]);

  return <div ref={ref} style={{ margin: "1.5rem 0" }} />;
}

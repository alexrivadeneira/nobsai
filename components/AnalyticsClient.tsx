"use client";

import { Analytics } from "@vercel/analytics/next";

export default function AnalyticsClient() {
  return (
    <Analytics
      beforeSend={(event) => {
        // Visits from browsers that have opted out (via /optout) are not counted.
        if (typeof window !== "undefined" && window.localStorage.getItem("va-disable")) {
          return null;
        }
        return event;
      }}
    />
  );
}

"use client";

import { useSyncExternalStore } from "react";

let listeners: Array<() => void> = [];

function subscribe(callback: () => void) {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter((l) => l !== callback);
  };
}

function getSnapshot() {
  return Boolean(window.localStorage.getItem("va-disable"));
}

function getServerSnapshot() {
  return false;
}

export default function OptOutPage() {
  const optedOut = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    if (optedOut) {
      window.localStorage.removeItem("va-disable");
    } else {
      window.localStorage.setItem("va-disable", "1");
    }
    listeners.forEach((l) => l());
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-16 text-center">
      <h1 className="text-2xl font-black uppercase tracking-tight mb-4" style={{ color: "#1a1a1a" }}>
        Analytics Opt-Out
      </h1>
      <p className="text-sm mb-6 leading-relaxed" style={{ color: "#4a4a4a" }}>
        {optedOut
          ? "This browser is excluded from analytics. Your visits are not being counted."
          : "This browser is currently being counted in analytics."}
      </p>
      <button
        onClick={toggle}
        className="btn-press inline-block text-xs font-black uppercase px-4 py-2 cursor-pointer"
        style={{ border: "2px solid #1a1a1a", color: "#1a1a1a", background: "white", boxShadow: "2px 2px 0px #1a1a1a" }}
      >
        {optedOut ? "Re-enable counting" : "Exclude this browser"}
      </button>
    </div>
  );
}

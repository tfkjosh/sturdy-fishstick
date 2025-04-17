import Hero from "@/components/sections/Hero";
import React from "react"

export const metadata = {
  description:
    "High-performance e-commerce store built with Next.js, Vercel, and Shopify.",
  openGraph: {
    type: "website",
  },
};

export default function Front() {
  return (
    <main className="flex-1">
      <Hero />
    </main>
  );
}
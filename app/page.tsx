"use client";

import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

export default function Home() {
  return (
    <main className="relative isolate overflow-hidden bg-zinc-950 text-zinc-100">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.35),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(139,92,246,0.25),transparent_35%)]" />

      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-6 py-20 text-center sm:px-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mb-6 inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/70 px-4 py-1 text-sm text-zinc-300"
        >
          Next.js + TypeScript + Tailwind
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.55, ease: "easeOut" }}
          className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl"
        >
          Minimal landing starter with smooth animations
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.55, ease: "easeOut" }}
          className="mt-6 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg"
        >
          Start simple, ship quickly, and scale later. This template gives you a clean foundation
          for a marketing page without extra complexity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, duration: 0.5, ease: "easeOut" }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <button className="rounded-full bg-blue-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-400">
            Get Started
          </button>
          <button className="rounded-full border border-zinc-700 bg-zinc-900/60 px-6 py-3 text-sm font-medium text-zinc-100 transition hover:border-zinc-500">
            View Demo
          </button>
        </motion.div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-5 px-6 pb-20 sm:grid-cols-3 sm:px-10">
        {[
          {
            title: "Fast by default",
            description: "Server rendering and optimized assets out of the box.",
          },
          {
            title: "Clean stack",
            description: "Only Next.js, TypeScript, Tailwind, and Framer Motion.",
          },
          {
            title: "Ready to evolve",
            description: "Easy to extend with forms, CMS, analytics, and integrations.",
          },
        ].map((item) => (
          <motion.article
            key={item.title}
            initial={fadeUp.initial}
            whileInView={fadeUp.whileInView}
            viewport={fadeUp.viewport}
            transition={fadeUp.transition}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6"
          >
            <h2 className="text-lg font-medium">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-300">{item.description}</p>
          </motion.article>
        ))}
      </section>
    </main>
  );
}

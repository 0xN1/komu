"use client";

import Link from "next/link";
import { motion as m } from "motion/react";
import { fadeIn, staggerAnimation } from "@/lib/anim";
import { ArrowUpRight } from "lucide-react";

const HomeLinks = [
  {
    label: "about",
    url: "/about",
  },
  {
    label: "resources",
    url: "/resources",
  },
  {
    label: "sessions",
    url: "/sessions",
  },
  {
    label: "community",
    url: "https://discord.gg/WXkBUPMtT2",
  },
];

export default function Home() {
  return (
    <>
      <main className="flex flex-col w-full min-h-[60dvh] max-h-[60dvh] gap-[32px] row-start-2 justify-between px-4">
        <div className="flex flex-col gap-4 h-full items-end">
          <m.div
            {...fadeIn}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="px-6 py-4 outline outline-primary rounded-full text-secondary"
          >
            A COMMUNITY INITIATIVE
          </m.div>
        </div>
        <m.div className="h-full gap-2 w-max text-5xl flex flex-col uppercase *:hover:underline *:decoration-primary">
          {HomeLinks.map((link, index) => (
            <m.span
              key={link.label}
              variants={staggerAnimation}
              custom={index}
              initial="hidden"
              animate="visible"
            >
              <Link href={link.url} className="flex flex-row gap-2">
                {link.label}
                <ArrowUpRight className="w-6 h-6 text-primary" />
              </Link>
            </m.span>
          ))}
        </m.div>
      </main>
    </>
  );
}

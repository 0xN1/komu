'use client'

import Link from "next/link";
import {motion as m} from "motion/react"
import { fadeIn } from "@/lib/anim";

const AboutPage = () => {
  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        {/* <N1LabLogo className="w-32" /> */}
        <Link
          href="/"
          className="text-xs uppercase text-secondary/80 hover:underline hover:text-primary ml-[2px]"
        >
          <m.span {...fadeIn} transition={{ delay: 0.1, duration: 0.5 }}>
            back to home
          </m.span>
        </Link>
        <m.h1 {...fadeIn} transition={{ delay: 0.1, duration: 0.5 }} className="text-4xl -ml-[1px]">KOMU</m.h1>
        <m.span {...fadeIn} transition={{ delay: 0.2, duration: 0.5 }}>
          <span className="text-primary">KOMU</span>{" "}
          <span className="text-zinc-400 align-super text-xs">
            (from &quot;komuniti&quot;)
          </span>{" "}
          is a community initiative designed for everyone to learn and share
          together.
        </m.span>
      </div>
      
    </div>
  );
};

export default AboutPage;

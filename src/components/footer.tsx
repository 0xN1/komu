'use client'

import Link from "next/link";
import { fadeIn } from "@/lib/anim";
import {motion as m} from "motion/react"

const Footer = () => {
  return (
    <footer className="w-full flex justify-between items-center p-4">
      <m.span {...fadeIn} transition={{ delay: 0.2, duration: 0.5 }}>+++++</m.span>
      <m.span {...fadeIn} transition={{ delay: 0.3, duration: 0.5 }} >
      <Link
        href="https://0xn1.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary hover:underline"
      >
        0XN1.DEV
      </Link>
      </m.span>
    </footer>
  );
};

export default Footer;

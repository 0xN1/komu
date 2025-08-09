'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import {motion as m} from "motion/react"
import { fadeIn } from "@/lib/anim";

const Header = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Set initial date
    updateDate();
    
    // Update date every minute
    const interval = setInterval(updateDate, 60000);
    
    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);

  const updateDate = () => {
    setCurrentDate(
      new Date().toLocaleDateString("en-MY", {
        month: "short",
        day: "2-digit",
        year: "2-digit",
      })
    );
  };

  return (
    <header className="w-full flex justify-between items-center p-4">
       <m.span {...fadeIn}>
      <Link
        href="/"
        className="font-medium tracking-tighter hover:text-primary hover:underline"
      >
          KOMU
        
      </Link>
      </m.span>
      <m.span {...fadeIn} transition={{ delay: 0.1, duration: 0.5 }} className="uppercase">
        {currentDate}
      </m.span>
    </header>
  );
};

export default Header;

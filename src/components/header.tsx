'use client'

import Link from "next/link";
import { useState, useEffect } from "react";

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
      <Link
        href="/"
        className="font-medium tracking-tighter hover:text-primary hover:underline"
      >
        KOMU
      </Link>
      <span className="uppercase">
        {currentDate}
      </span>
    </header>
  );
};

export default Header;

"use client";

import sessions from "@/lib/data/sessions";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion as m} from "motion/react"
import { fadeIn, tagsStaggerAnimation, staggerAnimation } from "@/lib/anim";

// Simple but effective shuffle function with seed
const shuffleArray = <T,>(array: T[], seed: number): T[] => {
  const shuffled = [...array];
  let currentSeed = seed;
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    currentSeed = (currentSeed * 9301 + 49297) % 233280;
    const j = Math.floor((currentSeed / 233280) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
};

// Custom hook for horizontal scrolling with mouse wheel
const useHorizontalScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      element.scrollLeft += e.deltaY;
    };

    element.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      element.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return scrollRef;
};

const ResourcesPage = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filteredResources, setFilteredResources] = useState<
    (typeof sessions)[0]["resources"]
  >([]);
  const [shuffledTags, setShuffledTags] = useState<string[]>([]);

  // Get all unique tags from sessions
  const tags = sessions
    .flatMap((session) => session.resources.map((resource) => resource.tags))
    .flat();
  const uniqueTags = [...new Set(tags)];

  // Shuffle tags on mount with a stable seed
  useEffect(() => {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    setShuffledTags(shuffleArray(uniqueTags, seed));
  }, []);

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
  };

  useEffect(() => {
    if (selectedTag) {
      setFilteredResources(
        sessions.flatMap((session) =>
          session.resources.filter((resource) =>
            resource.tags.includes(selectedTag)
          )
        )
      );
    }
  }, [selectedTag]);

  // Create refs for each scrollable container
  const scrollRef1 = useHorizontalScroll();
  const scrollRef2 = useHorizontalScroll();
  const scrollRef3 = useHorizontalScroll();

  return (
    <div className="w-full flex flex-col gap-4 p-4 relative -mt-12">
      <m.span {...fadeIn} transition={{ delay: 0.2, duration: 0.5 }}>
        <Link
          href="/"
          className="text-xs uppercase text-secondary/80 -mb-2 hover:underline hover:text-primary ml-[2px]"
        >
          back to home
        </Link>
      </m.span>
      <m.h1 {...fadeIn} transition={{ delay: 0.2, duration: 0.5 }} className="text-4xl uppercase">RESOURCES</m.h1>
      <div className="flex flex-col gap-2 w-full relative">
        <div className="flex flex-col gap-2 w-screen absolute inset-0 -ml-12 sm:-ml-24 pointer-events-none">
        <div 
          ref={scrollRef1}
          className="flex flex-row gap-2 overflow-x-auto w-full max-w-screen flex-nowrap scrollbar-hidden pl-8 pointer-events-auto"
        >
          {shuffledTags.slice(0, Math.ceil(shuffledTags.length / 3)).map((tag, index) => (
            <m.div key={tag} className="flex-shrink-0">
              <m.button 
                variants={tagsStaggerAnimation} 
                custom={index} 
                initial="hidden" 
                animate="visible"
                className={`text-xl uppercase cursor-pointer hover:underline hover:decoration-primary border-2 border-primary rounded-full px-4 py-2 ${
                  selectedTag === tag 
                    ? 'bg-primary text-secondary' 
                    : 'hover:bg-primary hover:text-white'
                }`}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </m.button>
            </m.div>
          ))}
        </div>
        <div 
          ref={scrollRef2}
          className="flex flex-row gap-2 overflow-x-auto w-full max-w-screen flex-nowrap scrollbar-hidden pl-4 pointer-events-auto"
        >
          {shuffledTags
            .slice(
              Math.ceil(shuffledTags.length / 3),
              Math.ceil(shuffledTags.length / 3) * 2
            )
            .map((tag, index) => (
              <m.div key={tag} className="flex-shrink-0">
                <m.button 
                  variants={tagsStaggerAnimation} 
                  custom={index + Math.ceil(shuffledTags.length / 3)} 
                  initial="hidden" 
                  animate="visible"
                  className={`text-xl uppercase cursor-pointer hover:underline hover:decoration-primary border-2 border-primary rounded-full px-4 py-2 ${
                    selectedTag === tag 
                      ? 'bg-primary text-secondary' 
                      : 'hover:bg-primary hover:text-white'
                  }`}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </m.button>
              </m.div>
            ))}
        </div>
        <div 
          ref={scrollRef3}
          className="flex flex-row gap-2 overflow-x-auto w-full max-w-screen flex-nowrap pl-8 scrollbar-hidden pointer-events-auto"
        >
          {shuffledTags
            .slice(Math.ceil(shuffledTags.length / 3) * 2, shuffledTags.length)
            .map((tag, index) => (
              <m.div key={tag} className="flex-shrink-0">
                <m.button 
                  variants={tagsStaggerAnimation} 
                  custom={index + Math.ceil(shuffledTags.length / 3) * 2} 
                  initial="hidden" 
                  animate="visible"
                  className={`text-xl uppercase cursor-pointer hover:underline hover:decoration-primary border-2 border-primary rounded-full px-4 py-2 ${
                    selectedTag === tag 
                      ? 'bg-primary text-secondary' 
                      : 'hover:bg-primary hover:text-white'
                  }`}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </m.button>
              </m.div>
            ))}
        </div>
        </div>
        <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:space-y-4 gap-2 h-[24dvh] max-h-[24dvh] mt-48 sm:mt-60 overflow-y-auto scrollbar-hidden">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource, index) => (
              <m.div key={resource.id} variants={staggerAnimation} custom={index} initial="hidden" animate="visible">
                <Link
                  href={resource.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl uppercase underline text-primary"
                >
                  {resource.title}
                </Link>
                <p className="text-lg">{resource.description}</p>
              </m.div>
            ))
          ) : (
            <m.p {...fadeIn} transition={{ delay: 1.2, duration: 0.5 }} className="text-lg">click any tag above</m.p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;

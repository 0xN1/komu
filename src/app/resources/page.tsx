"use client";

import sessions from "@/lib/data/sessions";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

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
  const [shuffledSessions, setShuffledSessions] = useState(sessions);

  // Shuffle sessions on mount with a stable seed
  useEffect(() => {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    setShuffledSessions(shuffleArray(sessions, seed));
  }, []);

  // get all unique tags from shuffled sessions
  const tags = shuffledSessions
    .flatMap((session) => session.resources.map((resource) => resource.tags))
    .flat();
  const uniqueTags = [...new Set(tags)];

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
  };

  useEffect(() => {
    if (selectedTag) {
      setFilteredResources(
        shuffledSessions.flatMap((session) =>
          session.resources.filter((resource) =>
            resource.tags.includes(selectedTag)
          )
        )
      );
    }
  }, [selectedTag, shuffledSessions]);

  // Create refs for each scrollable container
  const scrollRef1 = useHorizontalScroll();
  const scrollRef2 = useHorizontalScroll();
  const scrollRef3 = useHorizontalScroll();

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <Link
        href="/"
        className="text-xs uppercase text-secondary/80 -mb-2 hover:underline hover:text-primary ml-[2px]"
      >
        back to home
      </Link>
      <h1 className="text-4xl uppercase">RESOURCES</h1>
      <div className="flex flex-col gap-2 w-full">
        <div 
          ref={scrollRef1}
          className="flex flex-row gap-2 overflow-x-auto w-full max-w-[80dvw] flex-nowrap scrollbar-hidden -ml-1"
        >
          {uniqueTags.slice(0, Math.ceil(uniqueTags.length / 3)).map((tag) => (
            <div key={tag} className="flex-shrink-0">
              <button
                className="text-xl uppercase cursor-pointer hover:underline hover:decoration-primary border-2 border-primary rounded-full px-4 py-2
                hover:bg-primary hover:text-white
                "
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </button>
            </div>
          ))}
        </div>
        <div 
          ref={scrollRef2}
          className="flex flex-row gap-2 overflow-x-auto w-full max-w-[80dvw] flex-nowrap scrollbar-hidden -ml-1"
        >
          {uniqueTags
            .slice(
              Math.ceil(uniqueTags.length / 3),
              Math.ceil(uniqueTags.length / 3) * 2
            )
            .map((tag) => (
              <div key={tag} className="flex-shrink-0">
                <button
                  className="text-xl uppercase cursor-pointer hover:underline hover:decoration-primary border-2 border-primary rounded-full px-4 py-2
                hover:bg-primary hover:text-white
                "
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </button>
              </div>
            ))}
        </div>
        <div 
          ref={scrollRef3}
          className="flex flex-row gap-2 overflow-x-auto w-full max-w-[80dvw] flex-nowrap scrollbar-hidden -ml-1"
        >
          {uniqueTags
            .slice(Math.ceil(uniqueTags.length / 3) * 2, uniqueTags.length)
            .map((tag) => (
              <div key={tag} className="flex-shrink-0">
                <button
                  className="text-xl uppercase cursor-pointer hover:underline hover:decoration-primary border-2 border-primary rounded-full px-4 py-2
                hover:bg-primary hover:text-white
                "
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </button>
              </div>
            ))}
        </div>
        <div className="flex flex-col gap-2 mt-4 h-[20dvh] max-h-[20dvh] overflow-y-auto">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource, index) => (
              <div key={resource.id}>
                <Link
                  href={resource.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl uppercase underline text-primary"
                >
                  {resource.title}
                </Link>
                <p className="text-lg">{resource.description}</p>
              </div>
            ))
          ) : (
            <p className="text-lg">click any tag above</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;

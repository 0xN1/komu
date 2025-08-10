'use client'

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion as m } from 'motion/react';
import { fadeIn, staggerAnimation } from '@/lib/anim';
import { useSessions } from '@/lib/hooks/usePayloadData';
import { ArrowLeft, ArrowUpRight, Calendar, Tag } from 'lucide-react';
import { Resource, Session } from '@/payload-types';

const SessionDetailPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  const { sessions, loading, error } = useSessions();

  // Find the session by slug
  const session = sessions.find(s => 
    s.title?.toLowerCase().replace(/ /g, '-') === slug
  ) as Session;

  if (loading) {
    return (
      <div className="w-full flex flex-col gap-4 p-4">
        <m.span {...fadeIn} transition={{ delay: 0.2, duration: 0.5 }}>
          <Link
            href="/sessions"
            className="text-xs uppercase text-secondary/80 hover:underline hover:text-primary ml-[2px]"
          >
            back to sessions
          </Link>
        </m.span>
        <m.div {...fadeIn} transition={{ delay: 0.5, duration: 0.5 }} className="text-lg">
          loading session...
        </m.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col gap-4 p-4">
        <m.span {...fadeIn} transition={{ delay: 0.2, duration: 0.5 }}>
          <Link
            href="/sessions"
            className="text-xs uppercase text-secondary/80 hover:underline hover:text-primary ml-[2px]"
          >
            back to sessions
          </Link>
        </m.span>
        <m.div {...fadeIn} transition={{ delay: 0.5, duration: 0.5 }} className="text-lg text-red-500">
          Error: {error}
        </m.div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="w-full flex flex-col gap-4 p-4">
        <m.span {...fadeIn} transition={{ delay: 0.2, duration: 0.5 }}>
          <Link
            href="/sessions"
            className="text-xs uppercase text-secondary/80 hover:underline hover:text-primary ml-[2px]"
          >
            back to sessions
          </Link>
        </m.span>
        <m.div {...fadeIn} transition={{ delay: 0.5, duration: 0.5 }} className="text-lg">
          Session not found
        </m.div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 p-4">
      <m.span {...fadeIn} transition={{ delay: 0.2, duration: 0.5 }}>
        <Link
          href="/sessions"
          className="text-xs uppercase text-secondary/80 hover:underline hover:text-primary ml-[2px]"
        >
          back to sessions
        </Link>
      </m.span>

      <m.div {...fadeIn} transition={{ delay: 0.3, duration: 0.5 }} className="flex flex-col gap-4">
        <h1 className="text-4xl uppercase">{session.title || 'Untitled Session'}</h1>
        
        {session.description && (
          <p className="text-sm text-secondary/80 max-w-2xl">{session.description}</p>
        )}

        <div className="sm:flex flex-wrap gap-4 items-center hidden">
          {session.date && (
            <div className="flex items-center gap-2 text-secondary/80">
              <Calendar className="w-4 h-4" />
              <span className='lowercase'>{new Date(session.date).toLocaleDateString("en-US", {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
          )}

          {session.topics && session.topics.length > 0 && (
            <div className="flex items-center gap-2 text-secondary/80">
              <Tag className="w-4 h-4" />
              <div className="flex gap-2">
                {session.topics.map((topic, index) => (
                  <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {topic.topic}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </m.div>

      {session.resources && session.resources.length > 0 && (
        <m.div {...fadeIn} transition={{ delay: 0.4, duration: 0.5 }} className="flex flex-col gap-4">
          <h2 className="text-2xl uppercase">Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-4 gap-0 max-h-[24dvh] overflow-y-auto scrollbar-hidden">
            {session.resources
            .filter((item): item is Resource => typeof item === 'object' && item !== null)
            .map((resource:Resource, index:number) => (
              <m.div 
                key={index} 
                variants={staggerAnimation} 
                custom={index} 
                initial="hidden" 
                animate="visible"
                className=""
              >
                <div className="flex flex-col gap-2">
                {resource.uri && (
                  <Link
                    href={resource.uri}
                    className="text-2xl uppercase underline text-primary hover:text-primary/80 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {resource.title || 'Untitled'}
                  </Link>
                   )}
                
                {resource.description && (
                  <p className="text-secondary/80 mb-3 text-sm">{resource.description}</p>
                )}
                 
                </div>
                  
                  {/* {resource.type && (
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs uppercase">
                      {resource.type}
                    </span>
                  )} */}
      
                

                {/* {resource.tags && resource.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {resource.tags.map((tag:any, tagIndex:number) => (
                      <span 
                        key={tagIndex} 
                        className="px-2 py-1 bg-secondary/10 text-secondary rounded text-xs"
                      >
                        {tag.tag || tag}
                      </span>
                    ))}
                  </div>
                )} */}
              </m.div>
            ))}
          </div>
        </m.div>
      )}
    </div>
  );
};

export default SessionDetailPage;

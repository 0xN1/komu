'use client'

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion as m } from 'motion/react';
import { fadeIn } from '@/lib/anim';
import { useResources } from '@/lib/hooks/usePayloadData';
import { Tag, ExternalLink, FileText, Image, Video, Music, Link as LinkIcon } from 'lucide-react';

const ResourceDetailPage = () => {
  const params = useParams();
  const resourceId = parseInt(params.id as string);
  const { resources, loading, error } = useResources();

  // Find the resource by ID
  const resource = resources.find(r => r.id === resourceId);

  const getResourceIcon = (type: string | null) => {
    switch (type) {
      case 'image':
        return <Image className="w-5 h-5" />;
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'audio':
        return <Music className="w-5 h-5" />;
      case 'document':
        return <FileText className="w-5 h-5" />;
      case 'link':
      default:
        return <LinkIcon className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="w-full flex flex-col gap-4 p-4">
        <m.span {...fadeIn} transition={{ delay: 0.2, duration: 0.5 }}>
          <Link
            href="/resources"
            className="text-xs uppercase text-secondary/80 hover:underline hover:text-primary ml-[2px]"
          >
            ← back to resources
          </Link>
        </m.span>
        <m.div {...fadeIn} transition={{ delay: 0.5, duration: 0.5 }} className="text-lg">
          Loading resource...
        </m.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col gap-4 p-4">
        <m.span {...fadeIn} transition={{ delay: 0.2, duration: 0.5 }}>
          <Link
            href="/resources"
            className="text-xs uppercase text-secondary/80 hover:underline hover:text-primary ml-[2px]"
          >
            ← back to resources
          </Link>
        </m.span>
        <m.div {...fadeIn} transition={{ delay: 0.5, duration: 0.5 }} className="text-lg text-red-500">
          Error: {error}
        </m.div>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="w-full flex flex-col gap-4 p-4">
        <m.span {...fadeIn} transition={{ delay: 0.2, duration: 0.5 }}>
          <Link
            href="/resources"
            className="text-xs uppercase text-secondary/80 hover:underline hover:text-primary ml-[2px]"
          >
            ← back to resources
          </Link>
        </m.span>
        <m.div {...fadeIn} transition={{ delay: 0.5, duration: 0.5 }} className="text-lg">
          Resource not found
        </m.div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 p-4">
      <m.span {...fadeIn} transition={{ delay: 0.2, duration: 0.5 }}>
        <Link
          href="/resources"
          className="text-xs uppercase text-secondary/80 hover:underline hover:text-primary ml-[2px]"
        >
          ← back to resources
        </Link>
      </m.span>

      <m.div {...fadeIn} transition={{ delay: 0.3, duration: 0.5 }} className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          {getResourceIcon(resource.type || null)}
          <h1 className="text-5xl uppercase font-bold">{resource.title || 'Untitled Resource'}</h1>
        </div>
        
        {resource.description && (
          <p className="text-xl text-secondary/80 max-w-3xl">{resource.description}</p>
        )}

        <div className="flex flex-wrap gap-4 items-center">
          {resource.type && (
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm uppercase font-medium">
              {resource.type}
            </span>
          )}

          {resource.tags && resource.tags.length > 0 && (
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-secondary/60" />
              <div className="flex gap-2">
                {resource.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm"
                  >
                    {typeof tag === 'string' ? tag : tag.tag || 'Unknown'}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </m.div>

      {resource.uri && (
        <m.div {...fadeIn} transition={{ delay: 0.4, duration: 0.5 }} className="flex flex-col gap-4">
          <h2 className="text-2xl uppercase font-semibold">Access Resource</h2>
          <div className="p-6 border border-primary/20 rounded-lg bg-primary/5">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-secondary/80 mb-2">Resource URL:</p>
                <p className="font-mono text-sm break-all">{resource.uri}</p>
              </div>
              <Link
                href={resource.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 px-6 py-3 bg-primary text-secondary rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Open Resource
              </Link>
            </div>
          </div>
        </m.div>
      )}

      <m.div {...fadeIn} transition={{ delay: 0.5, duration: 0.5 }} className="flex flex-col gap-4">
        <h2 className="text-2xl uppercase font-semibold">Resource Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-secondary/20 rounded-lg">
            <h3 className="font-medium mb-2">Resource ID</h3>
            <p className="text-secondary/80 font-mono">{resource.id}</p>
          </div>
          
          <div className="p-4 border border-secondary/20 rounded-lg">
            <h3 className="font-medium mb-2">Created</h3>
            <p className="text-secondary/80">
              {resource.createdAt ? new Date(resource.createdAt).toLocaleDateString("en-US", {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : 'Unknown'}
            </p>
          </div>
          
          <div className="p-4 border border-secondary/20 rounded-lg">
            <h3 className="font-medium mb-2">Last Updated</h3>
            <p className="text-secondary/80">
              {resource.updatedAt ? new Date(resource.updatedAt).toLocaleDateString("en-US", {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : 'Unknown'}
            </p>
          </div>
          
          <div className="p-4 border border-secondary/20 rounded-lg">
            <h3 className="font-medium mb-2">Resource Type</h3>
            <p className="text-secondary/80 capitalize">{resource.type || 'Unknown'}</p>
          </div>
        </div>
      </m.div>
    </div>
  );
};

export default ResourceDetailPage;

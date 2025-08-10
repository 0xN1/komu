import { useState, useEffect, useMemo } from 'react';
import { Session, Resource, Media } from '@/payload-types';
import { fetchSessions, fetchResources, fetchMedia } from '@/lib/payload-client';

export function useSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSessions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchSessions();
      setSessions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch sessions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  return { sessions, loading, error, refetch: loadSessions };
}

export function useResources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadResources = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchResources();
      setResources(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch resources');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResources();
  }, []);

  return { resources, loading, error, refetch: loadResources };
}

export function useMedia() {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMedia = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMedia();
      setMedia(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch media');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  return { media, loading, error, refetch: loadMedia };
}

// Helper function to get all unique tags from resources
export function useResourceTags() {
  const { resources, loading, error } = useResources();
  
  const tags = useMemo(() => {
    return resources
      .flatMap(resource => resource.tags || [])
      .filter(tag => tag?.tag)
      .map(tag => tag.tag!)
      .filter((tag, index, array) => array.indexOf(tag) === index);
  }, [resources]);

  return { tags, loading, error };
}

// Helper function to get resources by tag
export function useResourcesByTag(selectedTag: string | null) {
  const { resources, loading, error } = useResources();
  
  const filteredResources = useMemo(() => {
    return selectedTag 
      ? resources.filter(resource => 
          resource.tags?.some(tag => tag?.tag === selectedTag)
        )
      : [];
  }, [resources, selectedTag]);

  return { filteredResources, loading, error };
}

import { Session, Resource, Media } from "@/payload-types";

const PAYLOAD_API_BASE = "/api";

export async function fetchSessions(): Promise<Session[]> {
  try {
    const response = await fetch(`${PAYLOAD_API_BASE}/sessions`);
    if (!response.ok) {
      throw new Error(`Failed to fetch sessions: ${response.statusText}`);
    }
    const data = await response.json();
    return data.docs || [];
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return [];
  }
}

export async function fetchResources(): Promise<Resource[]> {
  try {
    const response = await fetch(`${PAYLOAD_API_BASE}/resources?limit=500`);
    if (!response.ok) {
      throw new Error(`Failed to fetch resources: ${response.statusText}`);
    }
    const data = await response.json();
    return data.docs || [];
  } catch (error) {
    console.error("Error fetching resources:", error);
    return [];
  }
}

export async function fetchMedia(): Promise<Media[]> {
  try {
    const response = await fetch(`${PAYLOAD_API_BASE}/media`);
    if (!response.ok) {
      throw new Error(`Failed to fetch media: ${response.statusText}`);
    }
    const data = await response.json();
    return data.docs || [];
  } catch (error) {
    console.error("Error fetching media:", error);
    return [];
  }
}

export async function fetchSessionById(
  id: string | number
): Promise<Session | null> {
  try {
    const response = await fetch(`${PAYLOAD_API_BASE}/sessions/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch session: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching session:", error);
    return null;
  }
}

export async function fetchResourceById(
  id: string | number
): Promise<Resource | null> {
  try {
    const response = await fetch(`${PAYLOAD_API_BASE}/resources/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch resource: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching resource:", error);
    return null;
  }
}

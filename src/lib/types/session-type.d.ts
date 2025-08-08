type Session = {
  id: number;
  title: string;
  description: string;
  topics: string[];
  resources: Resources[];
  date: Date;
};

type Resources = {
  id: number;
  title: string;
  description: string;
  uri: string;
  tags: string[];
  type: "link" | "video" | "image" | "audio" | "document";
};

export type { Session, Resources };

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
  url: string;
  type: string;
};

export type { Session, Resources };

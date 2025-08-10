import type { CollectionConfig } from "payload";
import { Resources } from "./Resources";

export const Sessions: CollectionConfig = {
  slug: "sessions",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true, // Allow public read access
    create: ({ req: { user } }) => Boolean(user), // Only authenticated users can create
    update: ({ req: { user } }) => Boolean(user), // Only authenticated users can update
    delete: ({ req: { user } }) => Boolean(user), // Only authenticated users can delete
  },
  fields: [
    {
      name: "title",
      type: "text",
    },
    {
      name: "description",
      type: "text",
    },
    {
      name: "topics",
      type: "array",
      fields: [
        {
          name: "topic",
          type: "text",
        },
      ],
    },
    {
      name: "date",
      type: "date",
    },
    {
        name: 'resources',
        type: 'relationship',
        relationTo: 'resources',
        hasMany: true,

    },
  ],
};
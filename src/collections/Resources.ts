import type { CollectionConfig } from "payload";

export const Resources: CollectionConfig = {
  slug: "resources",
  admin: {
    useAsTitle: "title",
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
      name: "uri",
      type: "text",
    },
    {
      name: "tags",
      type: "array",
      fields: [
        {
          name: "tag",
          type: "text",
        },
      ],
    },
    {
      name: "type",
      type: "select",
      options: ["link", "video", "image", "audio", "document"],
    },
  ],
};
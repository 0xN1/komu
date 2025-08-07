import { Session } from "@/lib/types/session-type";

const sessions: Session[] = [
  {
    id: 1,
    title: "borbor 004",
    description: "revolves around the theme of design tools you use",
    topics: ["design tools", "gen ai tools", "inspiration"],
    date: new Date("2025-07-31"),
    resources: [
      {
        id: 1,
        title: "florafauna",
        description: "gen ai tools",
        url: "https://www.florafauna.ai/",
        type: "gen-ai",
      },
      {
        id: 2,
        title: "visual electric",
        description: "gen ai tools",
        url: "https://visualelectric.com/",
        type: "gen-ai",
      },
      {
        id: 3,
        title: "cosmos.so",
        description: "visual reference - like pinterest",
        url: "https://cosmos.so/",
        type: "visual-reference",
      },
      {
        id: 4,
        title: "voicemeeter",
        description: "audio mixing - routing (windows)",
        url: "https://vb-audio.com/Voicemeeter/index.htm",
        type: "audio",
      },
      {
        id: 5,
        title: "loopback",
        description: "audio mixing - routing (mac)",
        url: "https://rogueamoeba.com/loopback/",
        type: "audio",
      },
      {
        id: 6,
        title: "ulanzi ls02",
        description: "camera desk mount",
        url: "/", // pending tiktok link
        type: "camera, desk, mount",
      },
      {
        id: 7,
        title: "devtalk.my",
        description: "local dev community",
        url: "https://devtalk.my/",
        type: "community",
      },
    ],
  },
  {
    id: 2,
    title: "borbor 005",
    description: "revolves around references and inspiration",
    topics: ["references", "inspiration"],
    date: new Date("2025-08-01"),
    resources: [
      {
        id: 1,
        title: "cosmos.so",
        description: "visual reference - like pinterest",
        url: "https://cosmos.so/",
        type: "visual-reference",
      },
      {
        id: 2,
        title: "teenage engineering",
        description: "product design - audio gear",
        url: "https://teenage.engineering/",
        type: "product design",
      },
    ],
  },
];

export default sessions;

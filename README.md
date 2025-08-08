# KOMU

**KOMU** (from "komuniti") is a community initiative designed for everyone to learn and share together. This web application serves as a platform for sharing resources, past sessions, and community knowledge.

## Features

### 🏠 Home Page

- Clean, minimalist interface with navigation to main sections
- Community-focused design with "A COMMUNITY INITIATIVE" branding
- Direct links to About, Resources, and Sessions

### 📚 Resources

- **Tag-based filtering**: Browse resources by categories like design tools, AI, productivity, music, etc.
- **Daily shuffled display**: Resources are shuffled daily to provide fresh discovery
- **Comprehensive collection**: Curated links to tools, websites, and resources shared during community sessions
- **Categories include**: Gen AI tools, design tools, audio tools, productivity apps, development resources, music, and more

### 📅 Sessions

- **Past sessions archive**: View all previous community sessions with dates
- **Session details**: Each session has its own page with detailed resources and topics
- **Chronological organization**: Sessions are organized by date for easy browsing

### ℹ️ About

- Information about the KOMU community initiative
- Explains the purpose and mission of the platform

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Package Manager**: Bun
- **Deployment**: Optimized for Vercel

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Git

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd komu
```

2. Install dependencies:

```bash
bun install
# or
npm install
```

3. Run the development server:

```bash
bun dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── resources/         # Resources page with filtering
│   ├── sessions/          # Sessions listing and detail pages
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── header.tsx         # Site header
│   ├── footer.tsx         # Site footer
│   └── icons/            # Icon components
└── lib/
    ├── data/
    │   └── sessions.ts    # Session and resource data
    └── types/
        └── session-type.d.ts  # TypeScript type definitions
```

## Data Structure

The application uses a structured data format for sessions and resources:

```typescript
interface Session {
  id: number;
  title: string;
  description: string;
  topics: string[];
  date: Date;
  resources: Resource[];
}

interface Resource {
  id: number;
  title: string;
  description: string;
  uri: string;
  tags: string[];
  type: "link" | "image";
}
```

## Available Scripts

- `bun dev` - Start development server
- `bun build` - Build for production
- `bun start` - Start production server
- `bun lint` - Run ESLint

## Contributing

This is a community initiative. To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Community Sessions

The platform currently features several "borbor" sessions covering topics like:

- Design tools and AI tools
- References and inspiration
- Self-hosting and productivity tools
- Animation libraries for web/mobile
- Creative commons and web development

Each session includes curated resources with tags for easy discovery and filtering.

## License

This project is part of the KOMU community initiative. Please respect the community guidelines when contributing.

---

**Built with ❤️ for the community**

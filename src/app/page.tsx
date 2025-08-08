import Link from "next/link";

const HomeLinks = [
  {
    label: "about",
    url: "/about",
  },
  {
    label: "resources",
    url: "/resources",
  },
  {
    label: "sessions",
    url: "/sessions",
  },
];

export default function Home() {
  return (
    <>
      <main className="flex flex-col w-full min-h-[60dvh] max-h-[60dvh] gap-[32px] row-start-2 justify-between px-4">
        <div className="flex flex-col gap-4 h-full items-end">
          <div className="px-6 py-4 bg-primary rounded-full text-background">
            A COMMUNITY INITIATIVE
          </div>
        </div>
        <div className="h-full gap-2 w-max text-5xl flex flex-col uppercase *:hover:underline *:decoration-primary">
          {HomeLinks.map((link) => (
            <Link key={link.label} href={link.url}>
              {link.label}
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

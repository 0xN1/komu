import sessions from "@/lib/data/sessions";
import Link from "next/link";

const SessionsPage = () => {
  return (
    <div className="w-full flex flex-col gap-2 p-4">
      <Link
        href="/"
        className="text-xs uppercase text-secondary/80 hover:underline hover:text-primary ml-[2px]"
      >
        back to home
      </Link>
      <h1 className="text-4xl uppercase opacity-80">PAST SESSIONS</h1>
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex flex-col">
          <h2 className="text-2xl uppercase flex flex-col">
            {sessions.map((session) => (
              <Link
                href={`/sessions/${slugify(session.title)}`}
                key={session.id}
                className="uppercase"
              >
                <span className="hover:underline peer hover:text-primary">
                  {session.title}
                </span>
                <span className="text-xs align-super ml-2 peer-hover:text-zinc-200">
                  {session.date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </Link>
            ))}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SessionsPage;

const slugify = (title: string) => {
  return title.toLowerCase().replace(/ /g, "-");
};

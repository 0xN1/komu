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
      <div className="flex flex-col gap-4 mt-2">
        <div className="flex flex-col">
          <div className="text-2xl uppercase flex flex-col h-[42dvh] max-h-[42dvh] gap-2 overflow-y-auto scrollbar-hidden">
            {sessions.reverse().map((session) => (
              <Link
                href={`/sessions/${slugify(session.title)}`}
                key={session.id}
                className="uppercase flex flex-row gap-2 items-center"
              >
                <span
                  className="
                text-xl uppercase cursor-pointer hover:underline hover:decoration-primary border-2 border-primary rounded-full px-4 py-2
                hover:bg-primary hover:text-white w-max"
                >
                  {session.title}
                </span>
                <span className="text-xs peer-hover:text-zinc-200">
                  {session.date.toLocaleDateString("en-MY", {
                    month: "short",
                    day: "2-digit",
                    year: "2-digit",
                  })}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionsPage;

const slugify = (title: string) => {
  return title.toLowerCase().replace(/ /g, "-");
};

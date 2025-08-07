import sessions from "@/lib/data/sessions";
import Link from "next/link";

const SessionPage = async ({ params }: { params: { slug: string } }) => {
  const { slug: sessionSlug } = await params;

  const session = sessions.find(
    (session) => session.title.toLowerCase() === deSlugify(sessionSlug[0])
  );

  if (!session) {
    return <div>Session not found</div>;
  }

  return (
    <div className="w-full flex flex-col gap-2 p-4">
      <Link
        href="/sessions"
        className="text-xs uppercase text-secondary/80 hover:underline hover:text-primary ml-[2px]"
      >
        back to sessions
      </Link>
      <h1 className="text-4xl uppercase">{session?.title}</h1>
      <p className="text-sm">{session?.description}</p>
      <div className="flex flex-col gap-2 mt-4 max-h-[42dvh] overflow-y-auto">
        {session.resources.map((resource) => (
          <div key={resource.id}>
            <Link
              href={resource.url}
              className="underline text-primary uppercase hover:text-primary/80"
              target="_blank"
              rel="noopener noreferrer"
            >
              {resource.title}
            </Link>
            <p className="text-sm">{resource.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SessionPage;

const deSlugify = (slug: string) => {
  return slug.replace(/-/g, " ");
};

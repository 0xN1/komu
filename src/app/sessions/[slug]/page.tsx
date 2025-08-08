import sessions from "@/lib/data/sessions";
import Link from "next/link";
import Image from "next/image";

const SessionPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug: sessionSlug } = await params;

  const session = sessions.find(
    (session) => session.title.toLowerCase() === deSlugify(sessionSlug)
  );

  if (!session) {
    return <div>Session not found</div>;
  }

  return (
    <div className="w-full flex flex-col gap-2 p-4 relative">
      <Link
        href="/sessions"
        className="text-xs uppercase text-secondary/80 hover:underline hover:text-primary ml-[2px]"
      >
        back to sessions
      </Link>
      <h1 className="text-4xl uppercase">{session?.title}</h1>
      <p className="text-sm">{session?.description}</p>
      <div className="flex flex-col gap-2 mt-4 h-[42dvh] max-h-[42dvh] overflow-y-auto text-2xl">
        {session.resources.map((resource) => (
          <div key={resource.id}>
            {resource.type === "link" && (
              <Link
                href={resource.uri}
                className="underline text-primary uppercase hover:text-primary/80 relative z-10"
                target="_blank"
                rel="noopener noreferrer"
              >
                {resource.title}
              </Link>
            )}

            {resource.type === "image" && (
              <div className="relative">
                <div>
                  <Link
                    href={resource.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary uppercase hover:text-primary/80 cursor-pointer relative z-10 peer"
                  >
                    {resource.title}
                  </Link>
                  <div className="fixed inset-0 bg-black/50 opacity-0 peer-hover:opacity-100 transition-opacity duration-300 -z-10 flex items-center justify-center">
                    <Image
                      src={resource.uri}
                      alt={resource.title}
                      width={1000}
                      height={1000}
                      className="max-w-[90vw] max-h-[90vh] object-contain"
                    />
                  </div>
                </div>
              </div>
            )}
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

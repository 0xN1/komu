import Link from "next/link";
import N1LabLogo from "../../components/icons/n1-lab";

const AboutPage = () => {
  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        {/* <N1LabLogo className="w-32" /> */}
        <Link
          href="/"
          className="text-xs uppercase text-secondary/80 hover:underline hover:text-primary ml-[2px]"
        >
          back to home
        </Link>
        <h1 className="text-4xl -ml-[1px]">KOMU</h1>
        <p>
          <span className="text-primary">KOMU</span>{" "}
          <span className="text-zinc-400 align-super text-xs">
            (from &quot;komuniti&quot;)
          </span>{" "}
          is a community initiative designed for everyone to learn and share
          together.
        </p>
      </div>
      <ul className="list-inside list-decimal">
        <li className="hover:underline">
          <Link href="/resources">resources</Link>
        </li>
        <li className="hover:underline">
          <Link href="/sessions">past sessions</Link>
        </li>
      </ul>
    </div>
  );
};

export default AboutPage;

import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full flex justify-between items-center p-4">
      <Link
        href="/"
        className="font-medium tracking-tighter hover:text-primary hover:underline"
      >
        KOMU
      </Link>
      <span className="uppercase">
        {new Date().toLocaleDateString("en-MY", {
          month: "short",
          day: "2-digit",
          year: "2-digit",
        })}
      </span>
    </header>
  );
};

export default Header;

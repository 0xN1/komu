import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-6xl font-bold animate-minibounce">404</h1>
      <Link href="/" className="text-lg animate-pulse">
        GO BACK
      </Link>
    </div>
  );
};

export default NotFound;

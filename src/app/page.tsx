import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 gap-16 sm:p-20">
      <header className="w-full flex justify-between items-center p-4">
        <span className="font-medium tracking-tighter">KOMU</span>
        <span className="uppercase">
          {new Date().toLocaleDateString("en-MY", {
            month: "short",
            day: "2-digit",
            year: "2-digit",
          })}
        </span>
      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="main-container flex flex-col gap-4">
          <Link
            href="/komu"
            className="px-6 py-4 outline-1 outline-orange-600 bg-[#ff8600] rounded-full text-black minibounce"
          >
            KOMU by N1-LAB
          </Link>
        </div>
      </main>
      <footer className="w-full flex justify-between items-center p-4">
        <span>N1-LAB</span>
        <span>KOMU</span>
      </footer>
    </div>
  );
}

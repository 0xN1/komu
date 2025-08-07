import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full flex justify-between items-center p-4">
      <span>+++++</span>
      <Link
        href="https://0xn1.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary hover:underline"
      >
        0XN1.DEV
      </Link>
    </footer>
  );
};

export default Footer;

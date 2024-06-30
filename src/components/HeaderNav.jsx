"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const navLinks = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Our Collection", href: "/products" },
  { id: 3, name: "Reviews", href: "/reviews" },
  { id: 4, name: "Contact Us", href: "/contact" },
];

const HeaderNav = () => {
  const router = useRouter();
  const { pathname } = router;
    console.log(pathname);
  const renderLinks = () => {
    return navLinks.map((link) => (
      <li key={link.id} className="lg:mr-12">
        <Link className="rounded" href={link.href}>
          {link.name}
        </Link>
      </li>
    ));
  };
  return (
    <header className="text-primary container relative mx-auto flex flex-col overflow-hidden px-4 py-4 lg:flex-row lg:items-center bg-primary bg-opacity-20 border border-white shadow-2xl my-10 rounded-3xl lg:rounded-full">
      <Link
        href="/"
        className="flex items-center whitespace-nowrap text-2xl font-black"
      >
        <span className="mr-2">
          <Image src="/logo.webp" width={150} height={100} alt="" />
        </span>
      </Link>
      <input type="checkbox" className="peer hidden" id="navbar-open" />
      <label
        className="absolute top-2 right-5 cursor-pointer lg:hidden"
        htmlFor="navbar-open"
      >
        <svg
          className="h-7 w-7"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </label>
      <nav
        aria-label="Header Navigation"
        className="peer-checked:pt-8 peer-checked:max-h-60 flex max-h-0 w-full flex-col items-center overflow-hidden transition-all lg:ml-24 lg:max-h-full lg:flex-row"
      >
        <ul className="flex w-full flex-col items-center space-y-2 lg:flex-row lg:justify-center lg:space-y-0">
          {renderLinks()}
        </ul>
        <hr className="mt-4 w-full lg:hidden" />
        <div className="my-4 flex items-center space-x-6 space-y-2 lg:my-0 lg:ml-auto lg:space-x-8 lg:space-y-0">
          <Link
            href="#"
            title=""
            className="bg-secondary text-white px-4 py-2 rounded-xl min-w-max border hover:bg-opacity-20 hover:text-secondary hover:border-secondary"
          >
            Log in
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default HeaderNav;

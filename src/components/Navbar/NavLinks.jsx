import Link from "next/link";
const NavLinks = () => {
  const NavLinks = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Collection", link: "/collection" },
    { id: 3, name: "Reviews", link: "/reviews" },
    { id: 4, name: "Dashboard", link: "/dashboard" },
    { id: 5, name: "Contact", link: "/contact" },
  ];
  return (
    <>
      {NavLinks.map((link) => (
        <li key={link.id} className="xl:mr-12">
          <Link
            href={link.link}
            className={`rounded-full text-primary font-body hover:bg-primary/20 hover:px-2 hover:py-1 duration-500 hover:text-md`}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </>
  );
};

export default NavLinks;

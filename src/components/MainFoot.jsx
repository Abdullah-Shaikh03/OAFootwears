import Link from "next/link";
const MainFoot = () => {
const currentYear = new Date().getFullYear();

return (
    <footer className="relative mt-20 bg-primary/60 px-4 pt-6 mb-auto">
        <nav
            aria-label="Footer Navigation"
            className="mx-auto mb-10 flex items-center justify-center max-w-full flex-col gap-5 text-center sm:flex-row sm:text-left"
        >
            <Link href="#" className="font-medium text-white">
                Demo
            </Link>
            <Link href="#" className="font-medium text-white">
                Support
            </Link>
            <Link href="#" className="font-medium text-white">
                Privacy Policy
            </Link>
            <Link href="#" className="font-medium text-white">
                Terms & Conditions
            </Link>
        </nav>
        <p className="py-10 text-center text-tertiary">
            © {currentYear} | All Rights Reserved
        </p>
    </footer>
);
};

export default MainFoot;

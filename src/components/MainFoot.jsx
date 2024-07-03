import Image from "next/image";
const MainFoot = () => {
const currentYear = new Date().getFullYear();

return (
    <footer className="relative mt-20 bg-primary/60 px-4 pt-10 shadow-secondary-2xl">
        <nav
            aria-label="Footer Navigation"
            className="mx-auto mb-10 flex items-center justify-center max-w-full flex-col gap-10 text-center sm:flex-row sm:text-left"
        >
            <a href="#" className="font-medium text-white">
                Demo
            </a>
            <a href="#" className="font-medium text-white">
                Support
            </a>
            <a href="#" className="font-medium text-white">
                Privacy Policy
            </a>
            <a href="#" className="font-medium text-white">
                Terms & Conditions
            </a>
        </nav>
        <p className="py-10 text-center text-tertiary">
            © {currentYear} | All Rights Reserved
        </p>
    </footer>
);
};

export default MainFoot;

import { useState, useEffect } from "react";

export default function Navbar({ active, backToMenu }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        // close menu when window resize
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <nav className="bg-black bg-opacity-80 md:bg-opacity-50">
            <div className=" font-bai-jamjuree flex flex-wrap items-center justify-between p-2 mx-2 md:mx-10">
                <div>
                    {backToMenu ? (
                        <>
                            <button
                                className="focus:outline-none flex items-center space-x-3"
                                onClick={() => history.back()}
                            >
                                <i className="ri-arrow-left-line text-2xl"></i>
                                <p className="text-xl font-medium mb-1">
                                    Back to Menu
                                </p>
                            </button>
                        </>
                    ) : (
                        <a
                            href={route("home")}
                            className="flex items-center space-x-3 rtl:space-x-reverse"
                        >
                            {/* logo DF */}
                            <img
                                src="/img/logo.png"
                                className="h-8"
                                alt="DF Logo"
                            />
                        </a>
                    )}
                </div>

                {/* menus */}
                <button
                    onClick={toggleMenu}
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-200 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200"
                    aria-controls="navbar-default"
                    aria-expanded={isMenuOpen}
                >
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>
                <div
                    className={`${
                        isMenuOpen
                            ? "absolute top-14 left-0 w-full bg-black bg-opacity-80"
                            : "hidden"
                    } md:relative md:block md:w-auto`}
                    id="navbar-default"
                >
                    <ul
                        className="font-medium flex flex-col p-4 md:p-0 md:flex-row md:space-x-8 rtl:space-x-reverse"
                        id="menus"
                    >
                        <li>
                            <a
                                href={route("home")}
                                className={`block py-2 px-3 md:p-0 hover:text-sky-300 ${
                                    active === "Home"
                                        ? "text-sky-300 font-bold"
                                        : "text-white font-medium"
                                }`}
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href={route("portofolio")}
                                className={`block py-2 px-3 md:p-0 hover:text-sky-300 ${
                                    active === "Portofolio"
                                        ? "text-sky-300 font-bold"
                                        : "text-white font-medium"
                                }`}
                            >
                                Projects
                            </a>
                        </li>
                        <li>
                            <a
                                href={route("articles")}
                                className={`block py-2 px-3 md:p-0 hover:text-sky-300 ${
                                    active === "Articles"
                                        ? "text-sky-300 font-bold"
                                        : "text-white font-medium"
                                }`}
                            >
                                Articles
                            </a>
                        </li>
                        <li>
                            <a
                                href={route("contact")}
                                className={`block py-2 px-3 md:p-0 hover:text-sky-300 ${
                                    active === "Contact"
                                        ? "text-sky-300 font-bold"
                                        : "text-white font-medium"
                                }`}
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
                {/* logo gihtub */}
                <div className="hidden md:block">
                    <a
                        href="https://github.com/daffa09"
                        aria-label="My GitHub profile"
                    >
                        <i className="ri-github-line ri-2x border-gradient rounded-full p-1"></i>
                    </a>
                </div>
            </div>
        </nav>
    );
}

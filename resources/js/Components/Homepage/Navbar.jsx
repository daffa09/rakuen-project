export default function Navbar({ active }) {
    return (
        <nav className="bg-black bg-opacity-50">
            <div className="max-w-screen-2xl font-bai-jamjuree flex flex-wrap items-center justify-between mx-auto p-4">
                <a
                    href={route("home")}
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <img src="/img/logo.png" className="h-8" alt="DF Logo" />
                </a>
                <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
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
                    className="hidden w-full md:block md:w-auto"
                    id="navbar-default"
                >
                    <ul className="font-medium flex flex-col p-4 md:p-0  md:flex-row md:space-x-8 rtl:space-x-reverse ">
                        <li>
                            <a
                                href={route("home")}
                                className={`block py-2 px-3 md:p-0 hover:text-sky-300  ${
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
                                href="#"
                                className={`block py-2 px-3 md:p-0 hover:text-sky-300  ${
                                    active === "Portofolio"
                                        ? "text-sky-300 font-bold"
                                        : "text-white font-medium"
                                }`}
                            >
                                Portofolio
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className={`block py-2 px-3 md:p-0 hover:text-sky-300  ${
                                    active === "Article"
                                        ? "text-sky-300 font-bold"
                                        : "text-white font-medium"
                                }`}
                            >
                                Article
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className={`block py-2 px-3 md:p-0 hover:text-sky-300  ${
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
                <div className="hidden md:block">
                    <a href="https://github.com/daffa09">
                        <i className="ri-github-line ri-2x border-gradient rounded-full p-1"></i>
                    </a>
                </div>
            </div>
        </nav>
    );
}

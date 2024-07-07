export default function Footer() {
    return (
        <>
            <div className="bg-footer p-10 font-bai-jamjuree">
                <div className="border-t-4 border-gradient mx-14 rounded-sm hidden md:block"></div>

                <div className="block md:flex justify-between mx-5 my-7">
                    <div className="text-3xl font-bold">DF Portofolio</div>
                    <div className="">
                        <ul className="block md:flex gap-5">
                            <li>
                                <a href={route("home")}>Home</a>
                            </li>
                            <li>
                                <a href={route("portofolio")}>Portofolio</a>
                            </li>
                            <li>
                                <a href={route("articles")}>Articles</a>
                            </li>
                            <li>
                                <a href={route("contact")}>Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="block md:flex justify-between mx-5">
                    <div className="">
                        <span className="font-semibold">
                            {" "}
                            @{new Date().getFullYear()} Daffa Fathan{" "}
                        </span>
                        | All Right Reserved
                    </div>
                    <div className="hidden md:block text-4xl">
                        <a href="https://www.linkedin.com/in/daffa-fathan/">
                            <i className="ri-linkedin-fill text-black bg-gradient rounded-full p-1 mx-2"></i>
                        </a>
                        <a href="https://www.instagram.com/dafathan.v2/">
                            <i className="ri-instagram-line text-black bg-gradient rounded-full p-1 mx-2"></i>
                        </a>
                        <a href="https://github.com/daffa09">
                            <i className="ri-github-line text-black bg-gradient rounded-full p-1"></i>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

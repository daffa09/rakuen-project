export default function ProjectRecent({ data }) {
    return (
        <>
            <div className="hidden md:block bg-dark-ec-2">
                <div className="grid grid-cols-12 gap-4 p-9">
                    <h1 className="col-span-6 text-6xl text-white font-semibold font-bai-jamjuree">
                        Look At{" "}
                        <span className="color-gradient">
                            My Recent <br />
                            Projects
                        </span>
                    </h1>
                    <p className="col-span-6 text-white text-xl text-justify">
                        Here are a few projects I've completed recently. You can
                        find more details about each project on my portfolio
                        page. I've worked on a range of projects, from
                        developing web apps to designing user interfaces. Each
                        project showcases my skills and dedication to delivering
                        high-quality results. Feel free to explore my portfolio
                        to learn more about my work and the solutions I've
                        created.
                    </p>
                </div>
                <div className="flex gap-4 justify-center p-5">
                    {data.map((project, i) => (
                        <div
                            className="max-w-md bg-dark-ec-2 border border-gray-200 border-b-0 rounded-lg shadow"
                            key={i}
                        >
                            <a href="#">
                                <img
                                    className="rounded-t-lg p-1 w-full h-64 object-cover"
                                    src={project.banner}
                                    alt="Banner"
                                />
                            </a>
                            <div className="p-5 bg-gradient-bottom">
                                <a href="#">
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-white">
                                        {project.title.substring(0, 30) + "..."}
                                    </h5>
                                </a>
                                <p className="mb-3 text-sm font-normal text-white">
                                    {project.content.substring(0, 100) + "..."}
                                </p>
                                <a
                                    href="#"
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-400 rounded-lg hover:bg-green-800 focus:ring-4"
                                >
                                    Read more
                                    <svg
                                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 10"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M1 5h12m0 0L9 1m4 4L9 9"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center">
                    <a
                        href={route("portofolio")}
                        className="text-white bg-gradient focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center mb-5"
                    >
                        More Projects
                        <i className="ri-arrow-right-line ml-2"></i>
                    </a>
                </div>
            </div>
        </>
    );
}

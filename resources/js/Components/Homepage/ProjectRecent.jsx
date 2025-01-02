// Utility function to strip HTML tags
const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
};

// Utility function to truncate text
const truncateText = (text, length) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + "...";
};

export default function ProjectRecent({ data }) {
    // make sure data is array
    const base = data.data;
    const projects = Array.isArray(base) ? base : [];

    return (
        <>
            <div className="bg-dark-ec-2 min-h-screen flex flex-col justify-between md:block">
                <div className="">
                    <div className="block md:grid grid-cols-12 gap-4 p-9">
                        <h1 className="col-span-6 text-3xl md:text-6xl text-white font-semibold font-bai-jamjuree">
                            Look At{" "}
                            <span className="color-gradient">
                                My Recent <br />
                                Projects
                            </span>
                        </h1>
                        <p className="col-span-6 text-white text-xl text-justify hidden md:block">
                            Here are a few projects I've completed recently. You
                            can find more details about each project on my
                            portfolio page. I've worked on a range of projects,
                            from developing web apps to designing user
                            interfaces. Each project showcases my skills and
                            dedication to delivering high-quality results. Feel
                            free to explore my portfolio to learn more about my
                            work and the solutions I've created.
                        </p>
                    </div>
                    {projects.length === 0 ? (
                        <p className="text-white text-xl text-center mt-56">
                            Tidak ada project
                        </p>
                    ) : (
                        <div className="block md:flex gap-4 justify-center p-5">
                            {projects.map((project, i) => {
                                const strippedContent = stripHtmlTags(
                                    project.content
                                );
                                const truncatedContent = truncateText(
                                    strippedContent,
                                    100
                                );

                                return (
                                    <div
                                        className="max-w-md bg-dark-ec-2 border border-gray-200 border-b-0 rounded-lg shadow mb-5 md:mb-0"
                                        key={i}
                                    >
                                        <a href="#">
                                            <img
                                                className="rounded-t-lg p-1 w-full h-64 object-cover"
                                                src={project.banner}
                                                alt={project.title}
                                            />
                                        </a>
                                        <div className="p-5 bg-gradient-bottom">
                                            <a href="#">
                                                <h5 className="mb-2 text-xl font-bold tracking-tight text-white">
                                                    {truncateText(
                                                        project.title,
                                                        30
                                                    )}
                                                </h5>
                                            </a>
                                            <p className="mb-3 text-sm font-normal text-white">
                                                {truncatedContent}
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
                                );
                            })}
                        </div>
                    )}
                </div>
                {projects.length > 0 && (
                    <div className="flex justify-center mt-auto mb-5">
                        <a
                            href={route("portofolio")}
                            className="text-white bg-gradient focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center"
                        >
                            More Projects
                            <i className="ri-arrow-right-line ml-2"></i>
                        </a>
                    </div>
                )}
            </div>
        </>
    );
}

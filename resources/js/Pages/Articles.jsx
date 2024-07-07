import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Layouts/Navbar";
import Footer from "@/Components/Layouts/Footer";
import Paginator from "@/Components/Paginator";

export default function Portofolio(props) {
    const data = props.data ? props.data.data : [];
    return (
        <>
            <Head title={props.title} />
            <div
                className="font-bai-jamjuree"
                style={{ backgroundColor: "#242424" }}
            >
                <Navbar active={props.active} />
                <div className="mx-28 p-5 m-5">
                    <h1 className="text-5xl font-bold tracking-wide">
                        My Articles
                    </h1>
                    {/* <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search..."
                        className="w-full h-14 p-5 border rounded-lg text-gray-950 bg-gray-200"
                    /> */}
                </div>
                <div className="hidden md:block pb-5">
                    {data.map((project, i) => (
                        <div
                            className="max-w-full cursor-pointer p-5 grid grid-cols-2 items-center rounded-lg mx-40 hover:bg-gray-600 mb-3 shadow-md border border-gray-500"
                            key={i}
                        >
                            <a href="#">
                                <img
                                    className="object-cover w-full h-64 rounded-lg mt-2"
                                    src={project.banner}
                                    alt="project images"
                                />
                            </a>
                            <div className="flex flex-col justify-center p-4">
                                <h5 className="mb-2 text-xl font-bold ">
                                    {project.category_name}
                                </h5>
                                <h2 className="mb-2 text-4xl font-bold ">
                                    {project.title}
                                </h2>
                                <p className="mb-3 font-normal text-justify">
                                    {project.content.substring(0, 250) + "..."}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <Paginator meta={props.data} />
            </div>
            <Footer />
        </>
    );
}

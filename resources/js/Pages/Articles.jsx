import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Layouts/Navbar";
import Footer from "@/Components/Layouts/Footer";
import Paginator from "@/Components/Paginator";

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

export default function Articles(props) {
    const data = props.data ? props.data.data : [];

    return (
        <>
            <Head title={props.title} />
            <div
                className="flex flex-col min-h-screen font-bai-jamjuree"
                style={{ backgroundColor: "#242424" }}
            >
                <Navbar active={props.active} />
                <main className="flex-1">
                    <div className="mx-28 p-5 m-5">
                        <h1 className="text-5xl font-bold tracking-wide">
                            My Articles
                        </h1>
                        {/* Uncomment if search functionality is needed */}
                        {/* <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search..."
                            className="w-full h-14 p-5 border rounded-lg text-gray-950 bg-gray-200"
                        /> */}
                    </div>
                    <div className="hidden md:block pb-5">
                        {data.length === 0 ? (
                            <p className="text-center text-white text-xl">
                                Tidak ada article
                            </p>
                        ) : (
                            data.map((articles, i) => {
                                // Calculate the time difference between created_at and now with a 14-day range
                                const createdAt = new Date(articles.created_at);
                                const now = new Date();
                                const twoWeeksInMilliseconds =
                                    14 * 24 * 60 * 60 * 1000;
                                const isNew =
                                    now - createdAt < twoWeeksInMilliseconds;

                                // Process content to remove HTML tags and truncate
                                const strippedContent = stripHtmlTags(
                                    articles.content
                                );
                                const truncatedContent = truncateText(
                                    strippedContent,
                                    250
                                );

                                return (
                                    <div
                                        className="max-w-full cursor-pointer p-5 grid grid-cols-2 items-center rounded-lg mx-40 hover:bg-gray-600 mb-3 shadow-md border border-gray-500"
                                        key={i}
                                    >
                                        <a href="#">
                                            {isNew && i === 0 && (
                                                <img
                                                    className="mb-5 w-7"
                                                    src="/img/new.png"
                                                    alt="New articles"
                                                />
                                            )}
                                            <img
                                                className="object-cover w-full h-64 rounded-lg mt-2"
                                                src={articles.banner}
                                                alt="articles images"
                                            />
                                        </a>
                                        <div className="flex flex-col justify-center p-4">
                                            <h5 className="mb-2 text-xl font-bold ">
                                                {articles.category_name}
                                            </h5>
                                            <h2 className="mb-2 text-4xl font-bold ">
                                                {articles.title}
                                            </h2>
                                            <p className="mb-3 font-normal text-justify">
                                                {truncatedContent}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                    <Paginator meta={props.data} />
                </main>
                <Footer />
            </div>
        </>
    );
}

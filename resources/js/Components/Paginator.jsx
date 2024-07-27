import { Link } from "@inertiajs/react";

const Paginator = ({ meta }) => {
    if (!meta || !meta.links || meta.data.length === 0) {
        return null; // Tidak menampilkan pagination jika tidak ada data
    }

    const prev = meta.links[0].url;
    const next = meta.links[meta.links.length - 1].url;
    const current = meta.current_page;

    const getPageUrl = (pageNumber) => {
        const link = meta.links.find((link) => link.label == pageNumber);
        return link ? link.url : null;
    };

    const prevPageUrl = getPageUrl(current - 1);
    const nextPageUrl = getPageUrl(current + 1);

    return (
        <div className="flex justify-center pb-5">
            {prev && (
                <Link
                    href={prev}
                    className="text-gray-100 hover:text-white border-2 border-cyan-600 hover:bg-cyan-800 font-semibold rounded-full text-normal px-5 py-2.5 text-center me-2"
                >
                    «
                </Link>
            )}
            {prevPageUrl && (
                <Link
                    href={prevPageUrl}
                    className="text-gray-100 hover:text-white border-2 border-cyan-600 hover:bg-cyan-800 font-semibold rounded-full text-normal px-5 py-2.5 text-center me-2"
                >
                    {current - 1}
                </Link>
            )}
            <span className="text-gray-100 hover:text-white border-2 border-cyanborder-cyan-600 hover:bg-cyan-800 font-semibold rounded-full text-normal px-5 py-2.5 text-center me-2">
                {current}
            </span>
            {nextPageUrl && (
                <Link
                    href={nextPageUrl}
                    className="text-gray-100 hover:text-white border-2 border-cyan-600 hover:bg-cyan-800 font-semibold rounded-full text-normal px-5 py-2.5 text-center me-2"
                >
                    {current + 1}
                </Link>
            )}
            {next && (
                <Link
                    href={next}
                    className="text-gray-100 hover:text-white border-2 border-cyan-600 hover:bg-cyan-800 font-semibold rounded-full text-normal px-5 py-2.5 text-center me-2"
                >
                    »
                </Link>
            )}
        </div>
    );
};

export default Paginator;

import { Link } from "@inertiajs/react";

const Paginator = ({ meta }) => {
    if (!meta || !meta.links) {
        return null;
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
                    className="text-green-300 hover:text-white border border-green-400 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
                >
                    «
                </Link>
            )}
            {prevPageUrl && (
                <Link
                    href={prevPageUrl}
                    className="text-green-300 hover:text-white border border-green-400 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
                >
                    {current - 1}
                </Link>
            )}
            <span className="text-green-300 hover:text-white border border-green-400 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">
                {current}
            </span>
            {nextPageUrl && (
                <Link
                    href={nextPageUrl}
                    className="text-green-300 hover:text-white border border-green-400 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
                >
                    {current + 1}
                </Link>
            )}
            {next && (
                <Link
                    href={next}
                    className="text-green-300 hover:text-white border border-green-400 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
                >
                    »
                </Link>
            )}
        </div>
    );
};

export default Paginator;

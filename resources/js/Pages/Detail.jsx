import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Layouts/Navbar";

export default function Detail({ data }) {
    const galleryImage = [];

    for (let i = 0; i < data.gallery.length; i += 3) {
        galleryImage.push(data.gallery.slice(i, i + 3));
    }

    return (
        <>
            <Head title="Show" />
            <div className="bg-black bg-opacity-80">
                <Navbar backToMenu={true} />
            </div>

            <div className="py-12" style={{ backgroundColor: "#242424" }}>
                <div className="flex justify-between px-3 md:px-40">
                    <div className="text-left mx-auto">
                        <h1 className="text-2xl font-bold md:text-6xl">
                            {data.title}
                        </h1>
                    </div>
                </div>
                <div className="flex justify-center pt-10">
                    <img
                        src={data.banner}
                        alt={data.title}
                        className="w-2/3 md:w-2/5 h-auto rounded-md mx-auto"
                    />
                </div>
                {data.lang_urls.length > 0 && (
                    <div className="flex justify-center pb-3 md:pb-10 pt-1">
                        {data.lang_urls.map((lang, index) => (
                            <i
                                className={`text-sm md:text-2xl mr-1 ${lang}`}
                                key={index}
                            ></i>
                        ))}
                    </div>
                )}
                <div
                    className="text-justify content mx-4 md:mx-72 pt-3"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                ></div>
                {galleryImage.length > 0 && (
                    <div className="text-center py-6">
                        <h1 className="text-3xl">Gallery</h1>
                    </div>
                )}
                <div
                    className={`m-auto w-2/3 grid grid-cols-2 gap-2 md:gap-0 ${
                        galleryImage.length === 1
                            ? "md:grid-cols-1"
                            : galleryImage.length === 2
                            ? "md:grid-cols-2"
                            : galleryImage.length === 3
                            ? "md:grid-cols-3"
                            : "md:grid-cols-4"
                    }`}
                >
                    {(() => {
                        const elements = [];
                        for (
                            let groupIndex = 0;
                            groupIndex < galleryImage.length;
                            groupIndex++
                        ) {
                            const group = galleryImage[groupIndex];
                            const groupElements = (
                                <div className="flex justify-center">
                                    <div
                                        key={groupIndex}
                                        className="grid gap-4"
                                    >
                                        {(() => {
                                            const imageElements = [];
                                            for (
                                                let imageIndex = 0;
                                                imageIndex < group.length;
                                                imageIndex++
                                            ) {
                                                imageElements.push(
                                                    <div key={imageIndex}>
                                                        <img
                                                            className="h-auto md:max-w-52 rounded-lg"
                                                            src={
                                                                group[
                                                                    imageIndex
                                                                ]
                                                            }
                                                            alt={`${groupIndex}-${imageIndex}`}
                                                        />
                                                    </div>
                                                );
                                            }
                                            return imageElements;
                                        })()}
                                    </div>
                                </div>
                            );
                            elements.push(groupElements);
                        }
                        return elements;
                    })()}
                </div>
            </div>
        </>
    );
}

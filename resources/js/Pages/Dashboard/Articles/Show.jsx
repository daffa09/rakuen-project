import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head } from "@inertiajs/react";
import { useState } from "react";
import ConfirmationDialog from "@/Components/ConfirmationDialog";
import { formatDate } from "@/Utils";

export default function Show({ data, auth }) {
    const galleryImage = [];
    const { patch: patchRequest } = useForm();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [dataPublish, setDataPublish] = useState(null);
    const handlePublish = (id, dataPublish) => {
        setSelectedId(id);
        setDataPublish(dataPublish);
        setIsDialogOpen(true);
    };

    for (let i = 0; i < data.gallery.length; i += 3) {
        galleryImage.push(data.gallery.slice(i, i + 3));
    }

    const confirmPublish = () => {
        if (selectedId && !dataPublish) {
            patchRequest(`/articles/publish/${selectedId}`);
        } else {
            patchRequest(`/articles/unpublish/${selectedId}`);
        }
        setIsDialogOpen(false);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Show" />

            <div className="py-12">
                <div className="flex justify-between md:px-40">
                    <div className="text-left mx-auto">
                        <h1 className="text-2xl font-bold md:text-6xl">
                            {data.title}
                        </h1>
                    </div>
                    <div className="text-xs md:text-base">
                        <button
                            onClick={() => {
                                history.back();
                            }}
                            className="bg-red-500 text-white px-4 py-2 rounded-md mr-5"
                        >
                            Back to List
                        </button>
                        <button
                            onClick={() => handlePublish(data.id, data.publish)}
                            className="bg-green-500 text-white px-4 py-2 rounded-md"
                        >
                            {data.publish ? "Unpublish" : "Publish"}
                        </button>
                    </div>
                </div>
                <div className="flex justify-center pt-10">
                    <img
                        src={data.banner}
                        alt={data.title}
                        className="w-2/3 md:w-2/5 h-auto rounded-md mx-auto"
                    />
                </div>
                <div className="flex justify-end pb-4 pt-1 w-2/3 md:w-2/5 mx-auto">
                    <h1 className="text-xs font-bold md:text-xl">
                        {"( " + formatDate(data.created_at) + " )"}
                    </h1>
                </div>
                <div
                    className="text-justify content mx-4 md:mx-72 mt-11"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                ></div>
                {galleryImage.length > 1 && (
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

            <ConfirmationDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onConfirm={confirmPublish}
                message="Are you sure you want to publish this article?"
            />
        </AuthenticatedLayout>
    );
}

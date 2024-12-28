import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head } from "@inertiajs/react";
import { useState } from "react";
import ConfirmationDialog from "@/Components/ConfirmationDialog";

export default function Show({ data, auth }) {
    console.log(data);

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
            patchRequest(`/projects/publish/${selectedId}`);
        } else {
            patchRequest(`/projects/unpublish/${selectedId}`);
        }
        setIsDialogOpen(false);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Show" />

            <div className="py-12">
                <div className="flex justify-between md:px-40">
                    <div className="text-left">
                        <h1 className="text-xl md:text-6xl">{data.title}</h1>
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
                        className="w-2/5 h-auto rounded-md mx-auto"
                    />
                </div>
                <div className="flex justify-center pb-10 pt-1">
                    {data.lang_urls.map((lang, index) => (
                        <i className={`text-2xl mr-1 ${lang}`} key={index}></i>
                    ))}
                </div>
                <div
                    className="text-center content"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                ></div>
                <div className="text-center py-10">
                    <h1 className="text-3xl">Gallery</h1>
                </div>
                <div className="m-auto w-2/3 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {(() => {
                        const elements = [];
                        for (
                            let groupIndex = 0;
                            groupIndex < galleryImage.length;
                            groupIndex++
                        ) {
                            const group = galleryImage[groupIndex];
                            const groupElements = (
                                <div key={groupIndex} className="grid gap-4">
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
                                                        className="h-auto max-w-full rounded-lg"
                                                        src={group[imageIndex]}
                                                        alt={`Gallery image ${groupIndex}-${imageIndex}`}
                                                    />
                                                </div>
                                            );
                                        }
                                        return imageElements;
                                    })()}
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
                message="Are you sure you want to publish this project?"
            />
        </AuthenticatedLayout>
    );
}

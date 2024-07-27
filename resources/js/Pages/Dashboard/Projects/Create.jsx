import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Editor from "@/Components/Editor";

export default function Index({ auth }) {
    const { data, setData, post, lang_images } = useForm({
        title: "",
        banner: null,
        content: "",
        category: "",
        lang_images: "",
        gallery: [],
    });

    const [bannerPreview, setBannerPreview] = useState(null);
    const [galleryPreview, setGalleryPreview] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleBannerChange = (event) => {
        const file = event.target.files[0];
        setData("banner", file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBannerPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setBannerPreview(null);
        }
    };

    const handleGalleryChange = (event) => {
        const files = Array.from(event.target.files);
        setData("gallery", files);

        const updatedGalleryPreview = files.map((file) =>
            URL.createObjectURL(file)
        );
        setGalleryPreview(updatedGalleryPreview);
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch("/categories");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setCategories(data.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        post(route("projects.store"));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create Projects" />

            <div className="py-12">
                <div className="mx-auto" style={{ width: "80%" }}>
                    <h1 className="text-5xl font-semibold pb-10 text-center">
                        Create Projects
                    </h1>
                    <div className="w-9/12 mx-auto">
                        <form
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                        >
                            <div className="mb-4">
                                <label
                                    htmlFor="title"
                                    className="block text-xl font-medium"
                                >
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    className="mt-1 text-black focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="banner"
                                    className="block text-xl font-medium"
                                >
                                    Banner
                                </label>
                                {bannerPreview && (
                                    <div className="mb-4">
                                        <img
                                            src={bannerPreview}
                                            alt="Banner Preview"
                                            className="w-2/4 h-auto rounded-md mx-auto"
                                        />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    name="banner"
                                    id="banner"
                                    onChange={handleBannerChange}
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="content"
                                    className="block text-xl font-medium mb-1"
                                >
                                    Content
                                </label>
                                <Editor
                                    value={data.content}
                                    onChange={(value) =>
                                        setData("content", value)
                                    }
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="category"
                                    className="block text-xl font-medium"
                                >
                                    Category
                                </label>
                                <select
                                    name="category"
                                    id="category"
                                    value={data.category}
                                    onChange={(e) =>
                                        setData("category", e.target.value)
                                    }
                                    className="mt-1 text-black focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="lang_images"
                                    className="block text-xl font-medium"
                                >
                                    Languange Logo{" "}
                                    <span className="text-sm">
                                        (copy from{" "}
                                        <a
                                            href="https://devicon.dev/"
                                            target="_blank"
                                            className="underline text-blue-500 hover:to-blue-700"
                                        >
                                            https://devicon.dev/
                                        </a>
                                        ) [hint: implode by coma]
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="devicon-html5-plain, devicon-javascript-plain"
                                    name="lang_images"
                                    id="lang_images"
                                    value={data.lang_images}
                                    onChange={(e) =>
                                        setData("lang_images", e.target.value)
                                    }
                                    className="mt-1 text-black focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="gallery"
                                    className="block text-xl font-medium"
                                >
                                    Gallery
                                </label>
                                {galleryPreview.length > 0 && (
                                    <div className="mb-4 flex">
                                        {galleryPreview.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image}
                                                alt="Gallery Preview"
                                                className="w-36 h-auto rounded-md ml-4"
                                            />
                                        ))}
                                    </div>
                                )}
                                <input
                                    type="file"
                                    name="gallery[]"
                                    id="gallery"
                                    multiple
                                    onChange={handleGalleryChange}
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <button
                                    onClick={() => {
                                        history.back();
                                    }}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md mr-5"
                                >
                                    Back to List
                                </button>
                                <button
                                    type="submit"
                                    className="bg-indigo-500 text-white px-4 py-2 rounded-md"
                                >
                                    Create Project
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

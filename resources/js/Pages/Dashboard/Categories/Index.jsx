import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head, Link } from "@inertiajs/react";
import Paginator from "@/Components/Paginator";
import { useState } from "react";
import CreateDialogCategory from "@/Components/Categories/CreateDialogCategory";

export default function Index(props) {
    const { auth, flash = {} } = props;
    const data = props.data.data;
    const meta = props.data;

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const { post } = useForm();

    const createCategory = async (categoryName) => {
        if (categoryName === "") {
            alert("Category name cannot be empty");
            retrun;
        }

        const request = {
            name: categoryName,
            createdBy: auth.user.name,
        };

        post(route("categories.store", request));
        setIsDialogOpen(false);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Categories" />

            <div className="py-12">
                <div className="mx-auto" style={{ width: "80%" }}>
                    <h1 className="text-5xl font-semibold pb-10 text-center">
                        List Category
                    </h1>

                    {/* Tampilkan pesan sukses */}
                    {flash.success && (
                        <div className="mb-5 p-4 text-white bg-green-500 rounded-md">
                            {flash.success}
                        </div>
                    )}

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-5">
                        <div className="flex justify-end mb-5">
                            <button
                                className="bg-blue-500 text-white rounded-md p-2 font-semibold w-28 text-center cursor-pointer"
                                onClick={() => setIsDialogOpen(true)}
                            >
                                Create
                            </button>
                        </div>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                                <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            No
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Category Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3"
                                        ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((category, index) => (
                                        <tr
                                            key={category.id}
                                            className={`${
                                                index % 2 === 0
                                                    ? "odd:bg-gray-900"
                                                    : "even:bg-gray-800"
                                            } border-b border-gray-700 text-xl`}
                                        >
                                            <td className="px-6 py-4">
                                                {index + 1}
                                            </td>
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium  whitespace-nowrap text-white"
                                            >
                                                {category.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                <Link
                                                    href="#"
                                                    method="get"
                                                    className="font-medium text-2xl ml-3 text-blue-500 hover:text-white"
                                                >
                                                    <i className="ri-pencil-line"></i>
                                                </Link>
                                                <Link
                                                    href="#"
                                                    method="get"
                                                    className="font-medium text-2xl ml-3 text-red-500 hover:text-white"
                                                >
                                                    <i className="ri-delete-bin-line"></i>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Paginator meta={meta} />
                </div>

                <CreateDialogCategory
                    isOpen={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    onConfirm={(categoryName) => createCategory(categoryName)}
                    message="Create Category"
                />
            </div>
        </AuthenticatedLayout>
    );
}

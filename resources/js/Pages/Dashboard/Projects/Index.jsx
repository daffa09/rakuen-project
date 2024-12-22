import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head, Link } from "@inertiajs/react";
import Paginator from "@/Components/Paginator";
import { useState } from "react";
import ConfirmationDialog from "@/Components/ConfirmationDialog";

export default function Index(props) {
    const { auth, flash = {} } = props;
    const data = props.data.data;
    const meta = props.data;

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const { delete: deleteRequest } = useForm();

    const handleDelete = (id) => {
        setSelectedId(id);
        setIsDialogOpen(true);
    };

    const confirmDelete = () => {
        if (selectedId) {
            deleteRequest(`/projects/delete/${selectedId}`);
        }
        setIsDialogOpen(false);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Projects" />

            <div className="py-12">
                <div className="mx-auto" style={{ width: "80%" }}>
                    <h1 className="text-5xl font-semibold pb-10 text-center">
                        Projects List
                    </h1>

                    {/* Tampilkan pesan sukses */}
                    {flash.success && (
                        <div className="mb-5 p-4 text-white bg-green-500 rounded-md">
                            {flash.success}
                        </div>
                    )}

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-5">
                        <div className="flex justify-end mb-5">
                            <a
                                href={route("projects.create")}
                                className="bg-blue-500 text-white rounded-md p-2 font-semibold w-28 text-center cursor-pointer"
                            >
                                Create
                            </a>
                        </div>
                        <table className="w-full text-sm rtl:text-right text-gray-400">
                            <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                                <tr className="text-center">
                                    <th scope="col" className="px-6 py-3">
                                        No
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Banner
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Title
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <span>Action</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr
                                        className=" border bg-gray-900 border-gray-500 hover:bg-gray-600 text-justify"
                                        key={item.id}
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium whitespace-nowrap text-white"
                                        >
                                            {index + 1}
                                        </th>
                                        <td className="px-6 py-4">
                                            <img
                                                src={item.banner}
                                                alt={item.title}
                                                className="w-2/3 mx-auto rounded-lg"
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-xl font-semibold">
                                            {item.title}
                                        </td>
                                        <td className="px-6 py-4 text-lg font-thin">
                                            {item.category_name}
                                        </td>
                                        <td className="px-6 py-4 font-semibold">
                                            <span
                                                className={
                                                    item.publish
                                                        ? "text-green-400"
                                                        : "text-red-600"
                                                }
                                            >
                                                {item.publish
                                                    ? "Published"
                                                    : "Draft"}
                                            </span>
                                        </td>
                                        <td
                                            className="px-6 py-4 text-right"
                                            style={{ width: "200px" }}
                                        >
                                            <Link
                                                href="#"
                                                className="font-medium text-2xl ml-3 text-green-500 hover:text-white"
                                            >
                                                <i className="ri-eye-line"></i>
                                            </Link>
                                            <Link
                                                href={`/projects/edit/${item.id}`}
                                                method="get"
                                                className="font-medium text-2xl ml-3 text-blue-500 hover:text-white"
                                            >
                                                <i className="ri-pencil-line"></i>
                                            </Link>
                                            <button
                                                className="font-medium text-2xl ml-3 text-red-500 hover:text-white"
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }
                                            >
                                                <i className="ri-delete-bin-line"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Paginator meta={meta} />
                </div>
            </div>

            {/* Dialog Konfirmasi */}
            <ConfirmationDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onConfirm={confirmDelete}
                message="Are you sure you want to delete this project?"
            />
        </AuthenticatedLayout>
    );
}

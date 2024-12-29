import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head, Link } from "@inertiajs/react";
import Paginator from "@/Components/Paginator";
import { useState } from "react";
import ConfirmationDialog from "@/Components/ConfirmationDialog";

export default function Index(props) {
    const { auth, flash = {} } = props;
    const data = props.data.data;
    const meta = props.data;
    console.log(data, meta);

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
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>
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
                                            } border-b border-gray-700`}
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
                                                <a
                                                    href="#"
                                                    className="font-medium text-blue-500 hover:underline"
                                                >
                                                    Edit
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Paginator meta={meta} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

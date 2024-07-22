import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Paginator from "@/Components/Paginator";

export default function Index(props) {
    const { auth } = props; // Ekstraksi auth dari props
    const data = props.data.data;
    const meta = props.data;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Projects" />

            <div className="py-12">
                <div
                    className="mx-auto"
                    style={{
                        width: "80%",
                    }}
                >
                    <h1 className="text-5xl font-semibold pb-10 text-center">
                        Projects List
                    </h1>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-5">
                        <div className="flex justify-end mb-5">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white rounded-md p-2 font-semibold w-28 "
                            >
                                Create
                            </button>
                        </div>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-400">
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
                                        key={index}
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

                                        <td className="px-6 py-4 text-right">
                                            <a
                                                href="#"
                                                className="font-medium text-2xl text-blue-500 hover:text-white"
                                            >
                                                <i className="ri-pencil-line"></i>
                                            </a>
                                            <a
                                                href="#"
                                                className="font-medium text-2xl ml-3 text-red-500 hover:text-white"
                                            >
                                                <i className="ri-delete-bin-6-line"></i>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Paginator meta={meta} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

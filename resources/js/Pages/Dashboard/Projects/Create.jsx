import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Editor from "@/Components/Editor";

export default function Index({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create Projects" />

            <div className="py-12">
                <div
                    className="mx-auto"
                    style={{
                        width: "80%",
                    }}
                >
                    <h1 className="text-5xl font-semibold pb-10 text-center">
                        Create Projects
                    </h1>
                    <Editor />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

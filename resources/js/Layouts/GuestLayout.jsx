import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-900">
            <div>
                <Link href="/">
                    <img
                        src="/img/logo.png"
                        className="h-8 w-auto sm:h-10"
                        alt="DF Logo"
                    />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4  bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}

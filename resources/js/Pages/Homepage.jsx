import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Homepage/Navbar";

export default function Homepage(props) {
    return (
        <>
            <Head title={props.title} />
            <div className="">
                <div id="hero" className="relative">
                    <Navbar active={props.active} />
                    <h1
                        className="text-white text-7xl grid h-screen place-items-center"
                        style={{ marginTop: "-130px" }}
                    >
                        RAKUEN PROJECT START
                    </h1>
                </div>
            </div>
        </>
    );
}

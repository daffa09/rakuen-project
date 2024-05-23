import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Homepage/Navbar";
import HeroPage from "@/Components/Homepage/HeroPage";

export default function Homepage(props) {
    return (
        <>
            <Head title={props.title} />
            <div id="hero">
                <Navbar active={props.active} />
                <HeroPage />
            </div>
        </>
    );
}

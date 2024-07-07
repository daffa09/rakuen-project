import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Layouts/Navbar";
import HeroPage from "@/Components/Homepage/HeroPage";
import AboutMe from "@/Components/Homepage/AboutMe";
import ProjectRecent from "@/Components/Homepage/ProjectRecent";
import Footer from "@/Components/Layouts/Footer";

export default function Contact(props) {
    return (
        <>
            <Head title={props.title} />
            <div
                className="font-bai-jamjuree"
                style={{ backgroundColor: "#242424" }}
            >
                <Navbar active={props.active} />
                Contact Page
            </div>
            <Footer />
        </>
    );
}

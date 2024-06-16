import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Layouts/Navbar";
import HeroPage from "@/Components/Homepage/HeroPage";
import AboutMe from "@/Components/Homepage/AboutMe";
import ProjectRecent from "@/Components/Homepage/ProjectRecent";
import Footer from "@/Components/Layouts/Footer";

export default function Homepage(props) {
    return (
        <>
            <Head title={props.title} />
            <div id="hero">
                <Navbar active={props.active} />
                <HeroPage />
            </div>
            <AboutMe />
            <ProjectRecent data={props.data} />
            <Footer />
        </>
    );
}

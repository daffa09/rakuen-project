import { Head } from "@inertiajs/react";
import React, { useRef, useState } from "react";
import Navbar from "@/Components/Layouts/Navbar";
import Footer from "@/Components/Layouts/Footer";
import emailjs from "@emailjs/browser";

export default function Contact(props) {
    const form = useRef();
    const [notification, setNotification] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs
            .sendForm("service_4rxvp0u", "template_kks7r0x", form.current, {
                publicKey: "3n1HboDcj6TB0EoGy",
            })
            .then(
                (result) => {
                    setNotification(true); // Tampilkan notifikasi
                    setTimeout(() => {
                        setNotification(false); // Sembunyikan notifikasi setelah 3 detik
                    }, 3000);
                    // clean input
                    form.current.reset();
                },
                (error) => {
                    console.error(error.text);
                }
            );
    };

    return (
        <>
            <Head title={props.title} />
            <div
                className="font-bai-jamjuree min-h-screen flex flex-col"
                style={{ backgroundColor: "#242424" }}
            >
                <Navbar active={props.active} />
                <div className="flex-grow">
                    {notification && (
                        <div className="flex justify-end mt-5 mr-10">
                            <div
                                id="toast-simple"
                                className="flex items-center max-w-xl p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow"
                                role="alert"
                            >
                                <svg
                                    className="w-5 h-5 text-blue-600 dark:text-blue-500 rotate-45"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"
                                    />
                                </svg>
                                <div className="ps-4 text-sm font-normal">
                                    Message sent successfully. I will be reply
                                    soon.
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="grid md:grid-cols-2 md:p-10 gap-5">
                        {/* left side */}
                        <div className="ms-2 md:mx-24 text-gray-50 rounded-md p-5 mr-3">
                            <h1 className="font-semibold text-3xl md:text-6xl mb-2 tracking-wider">
                                Get In Touch
                            </h1>
                            <p className="text-sm md:text-xl font-normal text-justify w-full md:w-5/6">
                                Let's talk tech! I'm eager to dive into new
                                projects or discuss anything tech-related with
                                you. From brainstorming ideas to exploring the
                                latest advancements, count me in for an engaging
                                conversation. Let's dive deep into innovation
                                together!
                            </p>
                            <div className="mt-5">
                                <h2 className="text-xl md:text-2xl font-semibold tracking-wide">
                                    Email
                                </h2>
                                <a
                                    href="mailto:daffa.fathan9@gmail.com"
                                    className="text-sm md:text-xl text-blue-500 font-semibold"
                                >
                                    daffa.fathan9@gmail.com
                                </a>
                            </div>
                            <div className="mt-5 font-semibold tracking-wide">
                                <h2 className="font-bold text-xl md:text-2xl mb-2">
                                    Social Media
                                </h2>
                                <ul>
                                    <li>
                                        <a
                                            href="https://www.linkedin.com/in/daffa-fathan/"
                                            target="_blank"
                                            className="text-sm md:text-xl hover:text-blue-500"
                                        >
                                            Linkedin
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://github.com/daffa09"
                                            target="_blank"
                                            className="text-sm md:text-xl hover:text-blue-500"
                                        >
                                            Github
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.instagram.com/dafathan.v2/"
                                            target="_blank"
                                            className="text-sm md:text-xl hover:text-blue-500"
                                        >
                                            Instagram
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.facebook.com/dafathan.v2"
                                            target="_blank"
                                            className="text-sm md:text-xl hover:text-blue-500"
                                        >
                                            Facebook
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* right side */}
                        <div className="text-black font-normal grid items-center rounded-md p-6">
                            <form ref={form} onSubmit={sendEmail}>
                                <div className="grid mb-3">
                                    <label
                                        htmlFor="user_name"
                                        className="text-xl font-semibold text-white mb-1"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="user_name"
                                        name="user_name"
                                        className="md:w-4/6 rounded-lg"
                                        required
                                    />
                                </div>
                                <div className="grid mb-3">
                                    <label
                                        htmlFor="user_email"
                                        className="text-xl font-semibold text-white mb-1"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="user_email"
                                        name="user_email"
                                        className="md:w-4/6 rounded-lg"
                                        required
                                    />
                                </div>
                                <div className="grid mb-11 md:mb-16">
                                    <label
                                        htmlFor="message"
                                        className="text-xl font-semibold text-white mb-1"
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        className="md:w-4/6 rounded-lg"
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white rounded-md p-2 font-semibold w-full md:w-4/6"
                                >
                                    Send
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

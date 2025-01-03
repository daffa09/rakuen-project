export default function AboutMe() {
    return (
        <>
            <div className="block md:flex md:justify-between items-center max-w-screen-xl mx-auto mt-5 md:mt-20 mb-32 font-bai-jamjuree">
                <div className="flex-1 flex justify-center">
                    <img
                        src="/img/me.png"
                        alt="daffa fathan"
                        className="w-auto h-64 md:h-max object-cover drop-shadow-xl"
                    />
                </div>
                <div className="flex-1 text-black p-4">
                    <h1 className="text-3xl md:text-6xl font-semibold color-gradient tracking-wide md:mb-2">
                        About Me
                    </h1>
                    <h2 className="text-2xl md:text-5xl font-semibold tracking-wide mb-1 md:mb-3">
                        Software Engineer
                    </h2>
                    <p className="text-sm md:text-xl font-light tracking-wide text-justify">
                        I'm a Software Engineer with 2 years of experience in
                        building software industry. I hold a solid educational
                        background in computer science and possess extensive
                        expertise in diverse areas of software engineering. I've
                        worked on various projects like creating web
                        applications and managing databases. I believe good
                        software should always focus on what the client needs
                        and pay attention to every detail.
                    </p>
                </div>
            </div>
        </>
    );
}

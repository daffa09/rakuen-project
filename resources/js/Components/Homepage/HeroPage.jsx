export default function HeroPage() {
    return (
        <>
            <div className="flex justify-center md:justify-between flex-wrap items-center max-w-screen-xl mx-auto mt-52 font-bai-jamjuree">
                <div className="left">
                    <h1 className="text-2xl md:text-6xl font-bold color-gradient tracking-wide">
                        Daffa Fathan
                    </h1>
                    <p className="text-xl md:text-5xl font-bold tracking-wider">
                        <span className="text-gray-500">Developing </span>
                        App as Problem
                    </p>
                    <p className="text-xl md:text-5xl font-bold tracking-wider">
                        Solvers for Society
                    </p>
                </div>
                <div
                    className="right text-end hidden md:block"
                    style={{ color: "#373737" }}
                >
                    <h1
                        className="text-xl font-semibold "
                        style={{ color: "#373737" }}
                    >
                        Daffa Fathan
                    </h1>
                    <p>A Software engineer from Depok</p>
                    <p>with a strong interest in</p>
                    <p>developing app or website.</p>
                </div>
            </div>

            <div className="hidden md:flex justify-evenly mt-48 font-bai-jamjuree items-center mx-auto">
                <div className="w-72 text-justify">
                    <h1 className="text-xl font-bold">Web App Development</h1>
                    <p className="text-base">
                        Web Development is a Applied Art of Crafting Visual
                        Communication Through Text and Graphics.
                    </p>
                </div>
                <div className="w-72 text-justify">
                    <h1 className="text-xl font-bold">IT Consultant</h1>
                    <p className="text-base">
                        IT Consulting is a Crafting Solutions Tailored to
                        Address Clients' Needs and Market Demands.
                    </p>
                </div>
                <div className="w-72 text-justify">
                    <h1 className="text-xl font-bold">UI/UX Design</h1>
                    <p className="text-base">
                        UI/UX is a involves outlining the journey that users
                        take when they interact with a digital interface.
                    </p>
                </div>
                <div className="w-80 flex">
                    <h1 className="text-3xl font-bold mt-5 mx-3">
                        Scroll For More
                    </h1>
                    <div
                        className="flex items-center justify-center rounded-full border-gradient mt-3"
                        style={{ width: "50px", height: "50px" }}
                    >
                        <i className="ri-arrow-down-line ri-2x"></i>
                    </div>
                </div>
            </div>
        </>
    );
}

import React, { useMemo, useState } from "react";
import CanvasComponent from "../components/canvas";
import Header from "../components/Header";
import LinksSection from "../components/LinksSection";
import ContactModal from "../components/ContactModal";
import TypeWriter from "../components/TypeWriter";

/**
 * Home component that displays the main portfolio page
 * Features a typewriter effect for the name display and an interactive 3D background
 * @component
 * @returns {JSX.Element} The rendered Home component
 */

const Home = () => {
    const name = "Andrew Marshall";
    const aboutme =
        "> Hello I am Andrew Marshall, a software developer based in Roanoke, Virginia with experience with C++, Java, "+
        "Python, JS/TS, React, Pytorch, Graphics Development, Embedded Development, and much more";
    const nameSpeed = 100;
    const aboutmeSpeed = 10;
    const [content, setContent] = useState("");

    // Memoize CanvasComponent so it is not recreated on every render
    const memoizedCanvas = useMemo(() => <CanvasComponent />, []);

    return (
        <div className="content absolute inset-0 w-full bg-gray-100 h-svh m-0 p-0 flex items-center justify-center">
            <div className={`absolute inset-0 w-full`}>
                {memoizedCanvas}
                {content === "contact" && (
                    <ContactModal setContent={setContent} />
                )}
                {!(
                    content === "contact" ||
                    (content === "about" && window.innerWidth < 800)
                ) && (
                    <div className="absolute top-0 left-0 w-full h-full">
                        <Header>
                            <TypeWriter text={name} speed={nameSpeed} />
                        </Header>
                        <LinksSection setContent={setContent} />
                    </div>
                )}
                {content === "about" && (
                    <div className="absolute top-1/2 left-20 right-20 text-left md:w-100 bg-gray-800 rounded-lg p-3">
                        <button
                            className="absolute top-0 right-1"
                            onClick={() => setContent("")}
                        >x</button>
                        <p>
                            <TypeWriter text={aboutme} speed={aboutmeSpeed} />
                            <span className="blinker"> _</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;

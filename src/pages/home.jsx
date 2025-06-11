import React, { useEffect, useState, useMemo } from "react";
import CanvasComponent from "../components/canvas"; // Adjust the import path if necessary
import Contact from "./contact";

const Home = () => {
    const text = "Andrew Marshall";
    const speed = 100;
    const [displayText, setDisplayText] = useState("");
    const [index, setIndex] = useState(0);
    const [contact,setContact] = useState(false)
    useEffect(() => {
        if (index < text.length) {
            const timer = setTimeout(() => {
                setDisplayText((prevText) => prevText + text[index]);
                setIndex((prevIndex) => prevIndex + 1);
            }, speed);
            return () => clearTimeout(timer);
        }
    }, [index, text, speed]);

    // Memoize CanvasComponent so it is not recreated on every render
    const memoizedCanvas = useMemo(() => <CanvasComponent className="absolute inset-0 w-full h-full" />, []);

    return (
        <div className="fixed inset-0 w-screen h-screen bg-gray-100 overflow-hidden m-0 p-0 flex items-center justify-center">
            <div className="absolute inset-0 w-full h-full">
                {memoizedCanvas}
                {contact && 
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent h-1/3 z-20">
                    <Contact>
                        <button className="absolute bg-red-transparent top-0 right-1" onClick={() => setContact(false)}>x</button>
                    </Contact>
                </div>}
                {!contact && (
                    <>
                        <div className="absolute text-center top-1/3 right-0 md:top-1/3 md:right-1/5  w-100">
                              <div className="text-6xl font-mono text-green sm:text-4xl sm:text-center">
                                {displayText || text}<span className="blinker">_</span>
                            </div>
                            <p className="text-md font-mono text-orange-300 sm:text-sm sm:text-center">
                                Fullstack Software Developer
                            </p>
                            <br />
                        </div>
                        <div className="absolute bottom-1/3 right-0 m-5 text-white">
                            <div className="text-left">
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://github.com/afk47"
                                    className="m-5 p-2 text-xl font-mono hover:underline sm:text-lg"
                                >
                                    {"> G I T H U B"}
                                </a>
                                <br />
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="/ANDREW-MARSHALL-RESUME.pdf"
                                    className="m-5 p-2 text-xl font-mono hover:underline sm:text-lg"
                                >
                                    {"> R E S U M E"}
                                </a>
                                <br />
                                <a
                                    onClick={() => setContact(true)}
                                    rel="noopener noreferrer"
                                    href="#"
                                    className="bg-transparent m-5 p-2 text-xl font-mono hover:underline sm:text-lg"
                                >
                                    {"> C O N T A C T"}
                                </a>
                                <br />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;

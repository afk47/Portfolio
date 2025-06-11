import React, { useEffect, useState, useMemo } from "react";
import CanvasComponent from "../components/canvas"; 
import Header from "../components/Header";
import LinksSection from "../components/LinksSection";
import ContactModal from "../components/ContactModal";

const Home = () => {
    const text = "Andrew Marshall";
    const speed = 100;
    const [displayText, setDisplayText] = useState("");
    const [index, setIndex] = useState(0);
    const [contact, setContact] = useState(false);

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
    const memoizedCanvas = useMemo(() => <CanvasComponent/>, []);

    return (
        <div className="content absolute inset-0 w-full bg-gray-100 h-svh m-0 p-0 flex items-center justify-center">
            <div className={`absolute inset-0 w-full`}>
                {memoizedCanvas}
                {contact && <ContactModal setContact={setContact} />}
                {!contact && (
                    <div className="absolute top-0 left-0 w-full h-full">
                        <Header displayText={displayText} text={text} />
                        <LinksSection setContact={setContact} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;

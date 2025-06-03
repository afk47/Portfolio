import React, { useEffect } from "react";
import CanvasComponent from "../components/canvas"; // Adjust the import path if necessary

const Home = () => {
    return (
        <div className="fixed inset-0 w-screen h-screen bg-gray-100 overflow-hidden m-0 p-0">
            <div className="absolute inset-0 w-full h-full">
                {/* CanvasComponent as the background */}
                <CanvasComponent className="absolute inset-0 w-full h-full" />
                {/* Centered title */}
                <div className="absolute top-1/3 right-1/10 transform text-4xl text-gray-300 z-10">
                    <h1 className="transform text-lg text-gray-200">
                        Andrew Marshall
                    </h1>
                    <h2 className="transform text-lg text-gray-300">
                        Fullstack Software Developer
                    </h2>

                    <a href="https://github.com/afk47" class="text-white bg-blue-600 rounded-lg text-sm p-2">
                        Github
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Home;

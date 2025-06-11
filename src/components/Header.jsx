import React from "react";

const Header = ({ displayText, text }) => {
    return (
        <div className="relative md:absolute text-center top-1/3  justify-center md:top-1/3 md:right-0 md:w-200">
            <div className="md:text-6xl font-mono text-green text-4xl sm:text-center">
                {displayText || text}<span className="blinker">_</span>
            </div>
            <p className="text-md font-mono text-orange-300 sm:text-sm sm:text-center">
                Fullstack Software Developer
            </p>
            <br />
        </div>
    );
};

export default Header;

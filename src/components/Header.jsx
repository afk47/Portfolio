import React from "react";

const Header = ({ displayText, text }) => {
    return (
        <div className="absolute text-center top-1/3 right-0 md:top-1/3 md:right-1/5 w-100">
            <div className="text-6xl font-mono text-green sm:text-4xl sm:text-center">
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

import React from "react";

const LinksSection = ({ setContact }) => {
    return (
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
    );
};

export default LinksSection;

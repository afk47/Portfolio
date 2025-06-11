import React, { useState } from "react";

const ContactModal = ({ setContact }) => {
    const [result, setResult] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);

        formData.append("access_key", "2175f962-68ee-4192-9140-21f9f1d1eeab");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (data.success) {
            setResult("Form Submitted Successfully");
            event.target.reset();
        } else {
            console.log("Error", data);
            setResult(data.message);
        }
    };

    return (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent h-1/3 z-20">
            <div className="items-center justify-center bg-transparent relative">
                <form
                    onSubmit={onSubmit}
                    className="bg-gray-900/80 p-6 rounded-lg shadow-lg border border-gray-700 backdrop-blur-md"
                >
                    <button
                        className="absolute bg-red-transparent top-0 right-1"
                        onClick={() => setContact(false)}
                    >
                        x
                    </button>
                    <input
                        type="text"
                        name="name"
                        required
                        className="w-full mb-4 p-2 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-300 font-mono"
                        placeholder="> NAME"
                    />
                    <input
                        type="email"
                        name="email"
                        required
                        className="w-full mb-4 p-2 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-300 font-mono"
                        placeholder="> EMAIL"
                    />
                    <textarea
                        name="message"
                        required
                        className="w-full mb-4 p-2 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-300 max-h-30 font-mono "
                        placeholder="> MSG"
                    ></textarea>
                    <button
                        type="submit"
                        className="w-full p-2 bg-gradient-to-r from-orange-500 to-purple-500 text-white font-semibold border-none rounded-lg hover:from-orange-400 hover:to-purple-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300"
                    >
                        {"> SEND_"}
                    </button>
                </form>
                <span className="text-white mt-4">{result}</span>
            </div>
        </div>
    );
};

export default ContactModal;

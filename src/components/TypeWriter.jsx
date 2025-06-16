import React, { useEffect, useState } from "react";

/**
 * TypeWriter that creates a typing animation effect
 * @param {Object} props - Component props
 * @param {string} props.text - The text to be animated
 * @param {number} props.speed - The speed of typing in milliseconds (default: 100)
 * @param {Function} props.onComplete - Optional callback when typing is complete
 * @returns {string} The rendered text content with typewriter effect
 */
const TypeWriter = ({ text, speed = 100, onComplete }) => {
    const [displayText, setDisplayText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timer = setTimeout(() => {
                setDisplayText((prevText) => prevText + text[index]);
                setIndex((prevIndex) => prevIndex + 1);
            }, speed);
            return () => clearTimeout(timer);
        } else if (onComplete) {
            onComplete();
        }
    }, [index, text, speed, onComplete]);

    return displayText;
};

export default TypeWriter;

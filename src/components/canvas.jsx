import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import AnimatedBackgroundShader from "./BackgroundShader";

/**
 * A Three.js canvas component that renders a 3D background with custom shaders
 * @component
 * @returns {JSX.Element} The rendered Canvas component with Three.js scene
 */

const CanvasComponent = () => {
    const sceneRef = useRef();
    const cameraRef = useRef();

    return (
            <Canvas
                id="canvas-main"
                orthographic={false}
                camera={{fov:100 , position: [0, 0, 1] }}
                onCreated={({ scene, camera }) => {
                    console.log("Canvas onCreated triggered");
                    sceneRef.current = scene;
                    cameraRef.current = camera;
                }}
                fallback={<div>Sorry no WebGL supported!</div>}
                eventSource={document.getElementById('root')}
            >
                <ambientLight intensity={1} />
                <directionalLight color="white" position={[5, 5, 5]} />
                <mesh>
                    <AnimatedBackgroundShader />
                </mesh>
            </Canvas>
    );
};

export default CanvasComponent;

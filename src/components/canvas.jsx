import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import ShaderMaterialComponent from "./shaderTest";

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
                    <ShaderMaterialComponent />
                </mesh>
            </Canvas>
    );
};

export default CanvasComponent;

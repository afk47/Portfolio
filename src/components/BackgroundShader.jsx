import React, { useEffect, useState } from "react";
import { extend, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import fragment from "../assets/shader.frag";
import { MathUtils } from "three";

extend({ ShaderMaterial: THREE.ShaderMaterial });

/**
 * A Three.js shader material component that creates an animated background effect
 * Uses a custom fragment shader for an interactive 3D gradient background
 *
 * @component
 * @returns {JSX.Element} The rendered animated background shader
 */
const AnimatedBackgroundShader = () => {
    const shaderRef = React.useRef();
    useFrame(({ clock }) => {
        if (shaderRef.current) {
            shaderRef.current.uniforms.uTime.value = clock.getElapsedTime();
        }
    });

    const handleMouseMove = (evt) => {
        shaderRef.current.uniforms.uMouse.value.set(evt.clientX, evt.clientY );
    };
    useEffect(() => {
        const handleResize = () => {
            const canvas =
                shaderRef.current?.canvas ||
                document.getElementById("canvas-main");
            if (!shaderRef.current || !canvas) {
                console.warn("Shader reference or canvas not found");
                return;
            }
            try {
                const width = canvas.clientWidth;
                const height = canvas.clientHeight;
                console.log(width);
                shaderRef.current.uniforms.uResolution.value.set(
                    width || 1814,
                    height || 1480
                );
            } catch (error) {
                console.error("Error updating shader resolution:", error);
            }
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);
        handleResize();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.addEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <mesh>
                <planeGeometry args={[10, 10]} />
                <shaderMaterial
                    ref={shaderRef}
                    uniforms={{
                        uTime: { value: 0 },
                        uResolution: { value: new THREE.Vector2(1814, 1480) },
                        uMouse: { value: new THREE.Vector2(100, 100) },
                    }}
                    vertexShader={`
                    varying vec2 fragCoord;
                    void main() {
                        fragCoord = uv;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                        }
                        `}
                    fragmentShader={fragment}
                />
            </mesh>
        </>
    );
};

export default AnimatedBackgroundShader;

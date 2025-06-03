import React, { useEffect } from 'react';
import { extend, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import fragment from '../assets/shader.frag'
extend({ ShaderMaterial: THREE.ShaderMaterial });

const ShaderMaterialComponent = () => {
    const shaderRef = React.useRef();
    let fragmentShader = fragment;
    useFrame(({ clock }) => {
        if (shaderRef.current) {
            shaderRef.current.uniforms.uTime.value = clock.getElapsedTime();
            //shaderRef.current.uniforms.uResolution.value = new THREE.Vector2(window.innerWidth, window.innerHeight);
        }
    });
    useEffect(() => {
        const handleResize = () => {
            const canvas = shaderRef.current?.canvas || document.getElementById('canvas-main');
            if (shaderRef.current && canvas) {
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            shaderRef.current.uniforms.uResolution.value.set(1814, 1480);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <mesh>
            <planeGeometry args={[10,10]} />
            <shaderMaterial
                ref={shaderRef}
                uniforms={{
                    uTime: { value: 0 },
                    uResolution: {value: new THREE.Vector2(1814, 1480)},
                    uMouse: { value: new THREE.Vector2(100,100)}
                }}
                vertexShader={`
                    varying vec2 fragCoord;
                    void main() {
                        fragCoord = uv;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `}
                fragmentShader={fragmentShader}
            />
        </mesh>
    );
};

export default ShaderMaterialComponent;
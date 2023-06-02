import { useTexture } from "@react-three/drei";
import moonDay from '../../assets/8k_moon.jpg';
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useRef } from "react";
import * as THREE from 'three';

function Moon({ displacementScale, triangles }) {

    const moonRef = useRef();
    const clockRef = useRef(new THREE.Clock())

    const [moonTexture] = useTexture([moonDay])
    const xAxis = 4;

    const updateMoonPosition = useCallback(() => {
        //Axis rotation
        moonRef.current.rotation.y += 0.001;
    
        //Orbit Rotation
        moonRef.current.position.x = Math.sin(
            clockRef.current.getElapsedTime() * 0.8) * xAxis
        moonRef.current.position.z = Math.cos(
            clockRef.current.getElapsedTime() * 0.8) * xAxis
    }, [])

    useFrame(() => {
        updateMoonPosition()
    })

    // args values = radius, x, y
    return (
        <mesh receiveShadow castShadow ref={moonRef}
            position={[xAxis, 0, 0]}>
            <sphereGeometry
                args={[0.5, triangles, triangles]}
            />
            <meshPhongMaterial
                map={moonTexture}
                emissiveMap={moonTexture}
                emissive={0xffffff}
                emissiveIntensity={0.025}
            />
        </mesh>
    )
}

export default React.memo(Moon);
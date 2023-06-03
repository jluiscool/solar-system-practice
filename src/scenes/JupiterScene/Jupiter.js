import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useCallback } from "react";
import * as THREE from 'three';

import JupiterDay from '../../assets/8k_jupiter.jpg';

function Jupiter({ displacementScale, triangles }) {

    const jupiterRef = useRef();
    const distance = 40;
    //Create ref to jupiter position
    const jupiterPositionRef = useRef(new THREE.Vector3(distance, 0, 0))
    //Instead of using clock inside useFrame you can make a ref to it
    //const clockRef = useRef(new THREE.clock())

    const [jupiterTexture] = useTexture([JupiterDay])

    const updateJupiterPosition = useCallback((clock) => {
        const angle = clock.getElapsedTime() * 0.5;
        const x = Math.sin(angle) * distance;
        const z = Math.cos(angle) * distance
        jupiterRef.current.position.set(x, 0, z)
        jupiterRef.current.rotation.y += 0.001;
        jupiterPositionRef.current = jupiterRef.current.position;
    }, [])

    useFrame(({ clock }) => {
        updateJupiterPosition(clock)
    })

    // args values = radius, x, y
    return (
        <mesh ref={jupiterRef}>
            <sphereGeometry args={[3, triangles, triangles]} />
            <meshPhongMaterial
                map={jupiterTexture}
                emissiveMap={jupiterTexture}
                emissive={0xffffff}
                emissiveIntensity={0.5}
            />
        </mesh>
    )
}

export default React.memo(Jupiter);
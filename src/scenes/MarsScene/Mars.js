import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useCallback } from "react";
import * as THREE from 'three';

import MarsDay from '../../assets/8k_mars.jpg';

function Mars({ displacementScale, triangles }) {

    const marsRef = useRef();
    const distance = 28;
    //Create ref to mars position
    const marsPositionRef = useRef(new THREE.Vector3(distance, 0, 0))
    //Instead of using clock inside useFrame you can make a ref to it
    //const clockRef = useRef(new THREE.clock())

    const [marsTexture] = useTexture([MarsDay])

    const updateMarsPosition = useCallback((clock) => {
        const angle = clock.getElapsedTime() * 0.5;
        const x = Math.sin(angle) * distance;
        const z = Math.cos(angle) * distance
        marsRef.current.position.set(x, 0, z)
        marsRef.current.rotation.y += 0.001;
        marsPositionRef.current = marsRef.current.position;
    }, [])

    useFrame(({ clock }) => {
        updateMarsPosition(clock)
    })

    // args values = radius, x, y
    return (
        <mesh ref={marsRef}>
            <sphereGeometry args={[0.3, triangles, triangles]} />
            <meshPhongMaterial
                map={marsTexture}
                emissiveMap={marsTexture}
                emissive={0xffffff}
                emissiveIntensity={0.5}
            />
        </mesh>
    )
}

export default React.memo(Mars);
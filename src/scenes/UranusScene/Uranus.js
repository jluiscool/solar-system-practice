import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useCallback } from "react";
import * as THREE from 'three';

import UranusDay from '../../assets/2k_uranus.jpg';

function Uranus({ displacementScale, triangles }) {

    const uranusRef = useRef();
    const distance = 70;
    //Create ref to uranus position
    const uranusPositionRef = useRef(new THREE.Vector3(distance, 0, 0))
    //Instead of using clock inside useFrame you can make a ref to it
    //const clockRef = useRef(new THREE.clock())

    const [uranusTexture] = useTexture([UranusDay])

    const updateuranusPosition = useCallback((clock) => {
        const angle = clock.getElapsedTime() * 0.5;
        const x = Math.sin(angle) * distance;
        const z = Math.cos(angle) * distance
        uranusRef.current.position.set(x, 0, z)
        uranusRef.current.rotation.y += 0.001;
        uranusPositionRef.current = uranusRef.current.position;
    }, [])

    useFrame(({ clock }) => {
        updateuranusPosition(clock)
    })

    // args values = radius, x, y
    return (
        <mesh ref={uranusRef}>
            <sphereGeometry args={[1.4, triangles, triangles]} />
            <meshPhongMaterial
                map={uranusTexture}
                emissiveMap={uranusTexture}
                emissive={0xffffff}
                emissiveIntensity={0.5}
            />
        </mesh>
    )
}

export default React.memo(Uranus);
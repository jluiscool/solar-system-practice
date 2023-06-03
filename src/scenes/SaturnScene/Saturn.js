import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useCallback } from "react";
import * as THREE from 'three';

import SaturnDay from '../../assets/8k_saturn.jpg';

function Saturn({ displacementScale, triangles }) {

    const saturnRef = useRef();
    const distance = 60;
    //Create ref to Saturn position
    const SaturnPositionRef = useRef(new THREE.Vector3(distance, 0, 0))
    //Instead of using clock inside useFrame you can make a ref to it
    //const clockRef = useRef(new THREE.clock())

    const [saturnTexture] = useTexture([SaturnDay])

    const updateSaturnPosition = useCallback((clock) => {
        const angle = clock.getElapsedTime() * 0.5;
        const x = Math.sin(angle) * distance;
        const z = Math.cos(angle) * distance
        saturnRef.current.position.set(x, 0, z)
        saturnRef.current.rotation.y += 0.001;
        SaturnPositionRef.current = saturnRef.current.position;
    }, [])

    useFrame(({ clock }) => {
        updateSaturnPosition(clock)
    })

    // args values = radius, x, y
    return (
        <mesh ref={saturnRef}>
            <sphereGeometry args={[2, triangles, triangles]} />
            <meshPhongMaterial
                map={saturnTexture}
                emissiveMap={saturnTexture}
                emissive={0xffffff}
                emissiveIntensity={0.5}
            />
        </mesh>
    )
}

export default React.memo(Saturn);
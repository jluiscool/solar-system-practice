import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useCallback } from "react";
import * as THREE from 'three';

import MercuryDay from '../../assets/8k_mercury.jpg';

function Mercury({ displacementScale, triangles }) {

    const mercuryRef = useRef();
    const distance = 7;
    //Create ref to mercury position
    const mercuryPositionRef = useRef(new THREE.Vector3(distance, 0, 0))
    //Instead of using clock inside useFrame you can make a ref to it
    //const clockRef = useRef(new THREE.clock())

    const [mercuryTexture] = useTexture([MercuryDay])

    const updateMercuryPosition = useCallback((clock) => {
        const angle = clock.getElapsedTime() * 0.5;
        const x = Math.sin(angle) * distance;
        const z = Math.cos(angle) * distance
        mercuryRef.current.position.set(x, 0, z)
        mercuryRef.current.rotation.y += 0.001;
        mercuryPositionRef.current = mercuryRef.current.position;
    }, [])

    useFrame(({ clock }) => {
        updateMercuryPosition(clock)
    })

    // args values = radius, x, y
    return (
        <mesh ref={mercuryRef}>
            <sphereGeometry args={[0.3, triangles, triangles]} />
            <meshPhongMaterial
                map={mercuryTexture}
                emissiveMap={mercuryTexture}
                emissive={0xffffff}
                emissiveIntensity={0.5}
            />
        </mesh>
    )
}

export default React.memo(Mercury);
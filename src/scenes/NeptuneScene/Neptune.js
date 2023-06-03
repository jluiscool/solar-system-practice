import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useCallback } from "react";
import * as THREE from 'three';

import neptuneDay from '../../assets/2k_neptune.jpg';

function Neptune({ displacementScale, triangles }) {

    const neptuneRef = useRef();
    const distance = 78;
    //Create ref to neptune position
    const neptunePositionRef = useRef(new THREE.Vector3(distance, 0, 0))
    //Instead of using clock inside useFrame you can make a ref to it
    //const clockRef = useRef(new THREE.clock())

    const [neptuneTexture] = useTexture([neptuneDay])

    const updateNeptunePosition = useCallback((clock) => {
        const angle = clock.getElapsedTime() * 0.5;
        const x = Math.sin(angle) * distance;
        const z = Math.cos(angle) * distance
        neptuneRef.current.position.set(x, 0, z)
        neptuneRef.current.rotation.y += 0.001;
        neptunePositionRef.current = neptuneRef.current.position;
    }, [])

    useFrame(({ clock }) => {
        updateNeptunePosition(clock)
    })

    // args values = radius, x, y
    return (
        <mesh ref={neptuneRef}>
            <sphereGeometry args={[1.6, triangles, triangles]} />
            <meshPhongMaterial
                map={neptuneTexture}
                emissiveMap={neptuneTexture}
                emissive={0xffffff}
                emissiveIntensity={0.5}
            />
        </mesh>
    )
}

export default React.memo(Neptune);
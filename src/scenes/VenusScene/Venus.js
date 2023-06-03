import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useCallback } from "react";
import * as THREE from 'three';

import VenusDay from '../../assets/8k_venus_surface.jpg';

function Venus({ displacementScale, triangles }) {

    const venusRef = useRef();
    const distance = 12;
    //Create ref to venus position
    const venusPositionRef = useRef(new THREE.Vector3(distance, 0, 0))
    //Instead of using clock inside useFrame you can make a ref to it
    //const clockRef = useRef(new THREE.clock())

    const [venusTexture] = useTexture([VenusDay])

    const updateVenusPosition = useCallback((clock) => {
        const angle = clock.getElapsedTime() * 0.5;
        const x = Math.sin(angle) * distance;
        const z = Math.cos(angle) * distance
        venusRef.current.position.set(x, 0, z)
        venusRef.current.rotation.y += 0.001;
        venusPositionRef.current = venusRef.current.position;
    }, [])

    useFrame(({ clock }) => {
        updateVenusPosition(clock)
    })

    // args values = radius, x, y
    return (
        <mesh ref={venusRef}>
            <sphereGeometry args={[0.3, triangles, triangles]} />
            <meshPhongMaterial
                map={venusTexture}
                emissiveMap={venusTexture}
                emissive={0xffffff}
                emissiveIntensity={0.5}
            />
        </mesh>
    )
}

export default React.memo(Venus);
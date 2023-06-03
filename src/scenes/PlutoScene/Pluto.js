import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useCallback } from "react";
import * as THREE from 'three';

import PlutoDay from '../../assets/4k_eris_fictional.jpg';

function Pluto({ displacementScale, triangles }) {

    const plutoRef = useRef();
    const distance = 80;
    //Create ref to pluto position
    const plutoPositionRef = useRef(new THREE.Vector3(distance, 0, 0))
    //Instead of using clock inside useFrame you can make a ref to it
    //const clockRef = useRef(new THREE.clock())

    const [plutoTexture] = useTexture([PlutoDay])

    const updatePlutoPosition = useCallback((clock) => {
        const angle = clock.getElapsedTime() * 0.5;
        const x = Math.sin(angle) * distance;
        const z = Math.cos(angle) * distance
        plutoRef.current.position.set(x, 0, z)
        plutoRef.current.rotation.y += 0.001;
        plutoPositionRef.current = plutoRef.current.position;
    }, [])

    useFrame(({ clock }) => {
        updatePlutoPosition(clock)
    })

    // args values = radius, x, y
    return (
        <mesh ref={plutoRef}>
            <sphereGeometry args={[0.3, triangles, triangles]} />
            <meshPhongMaterial
                map={plutoTexture}
                emissiveMap={plutoTexture}
                emissive={0xffffff}
                emissiveIntensity={0.5}
            />
        </mesh>
    )
}

export default React.memo(Pluto);
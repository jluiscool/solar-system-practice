import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useCallback, useEffect, useState } from "react";
import * as THREE from 'three';

import Moon from "./Moon";
import ISS from "./ISS";

import EarthDay from '../../assets/8k_earth_daymap.jpg';
import earthNormalMap from '../../assets/8k_earth_normal_map.jpg';
import earthSpecularMap from '../../assets/8k_earth_specular_map.jpg';
import earthDisplacementMap from '../../assets/earth_displacement.jpg';
import earthEmissiveMap from '../../assets/8k_earth_nightmap.jpg';



function Earth({ displacementScale, triangles }) {

    const [hovered, setHovered] = useState(false)

    const earthRef = useRef();
    const distance = 20;
    //Create ref to earth position
    const earthPositionRef = useRef(new THREE.Vector3(distance, 0, 0))
    //Instead of using clock inside useFrame you can make a ref to it
    //const clockRef = useRef(new THREE.clock())

    const [earthTexture, earthNormalMapTexture, earthSpecularMapTexture,
        earthDisplacementMapTexture, earthEmissiveMapTexture] = useTexture([EarthDay, earthNormalMap, earthSpecularMap, earthDisplacementMap, earthEmissiveMap])

    const updateEarthPosition = useCallback((clock) => {
        const angle = clock.getElapsedTime() * 0.5;
        const x = Math.sin(angle) * distance;
        const z = Math.cos(angle) * distance
        earthRef.current.position.set(x, 0, z)
        earthRef.current.rotation.y += 0.001;
        earthPositionRef.current = earthRef.current.position;
    }, [])

    useFrame(({ clock }) => {
        updateEarthPosition(clock)
    })

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto'
    }, [hovered])

    // args values = radius, x, y
    return (
        <group ref={earthRef}>
            <mesh castShadow receiveShadow 
            onPointerOut={() => { setHovered(false)}}
            onPointerOver={() => {setHovered(true)}}>
                <sphereGeometry args={[1, triangles, triangles]} />
                <meshPhongMaterial
                    map={earthTexture}
                    normalMap={earthNormalMapTexture}
                    specularMap={earthSpecularMapTexture}
                    shininess={1000}
                    displacementMap={earthDisplacementMapTexture}
                    displacementScale={displacementScale}
                    emissiveMap={earthEmissiveMapTexture}
                    emissive={0xffffff}
                    emissiveIntensity={hovered ? 20 : 1.5}
                />
            </mesh>
            <ISS />
            <Moon />
        </group>
    )
}

export default React.memo(Earth);
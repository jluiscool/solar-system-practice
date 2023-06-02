import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from 'three';

import Moon from "./Moon";
import ISS from "./ISS";

import EarthDay from '../../assets/8k_earth_daymap.jpg';
import earthNormalMap from '../../assets/8k_earth_normal_map.jpg';
import earthSpecularMap from '../../assets/8k_earth_specular_map.jpg';
import earthDisplacementMap from '../../assets/earth_displacement.jpg';
import earthEmissiveMap from '../../assets/8k_earth_nightmap.jpg';



function Earth({ displacementScale, triangles }) {

    const earthRef = useRef();
    const distance = 10;
    //Create ref to earth position
    const earthPositionRef = useRef(new THREE.Vector3(distance,0,0)) 

    const [earthTexture, earthNormalMapTexture, earthSpecularMapTexture,
        earthDisplacementMapTexture, earthEmissiveMapTexture] = useTexture([EarthDay, earthNormalMap, earthSpecularMap, earthDisplacementMap, earthEmissiveMap])

        

    useFrame(({clock}) => {
        const angle = clock.getElapsedTime() * 0.5;
        const x = Math.sin(angle) * distance;
        const z = Math.cos(angle) * distance
        earthRef.current.position.set(x,0,z)
        earthRef.current.rotation.y += 0.001;
        earthPositionRef.current = earthRef.current.position;
    })

    // args values = radius, x, y
    return (
        <group ref={earthRef}>
            <mesh castShadow receiveShadow >
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
                    emissiveIntensity={1.5}
                />
            </mesh>
            <ISS />
            <Moon />
        </group>
    )
}

export default Earth;
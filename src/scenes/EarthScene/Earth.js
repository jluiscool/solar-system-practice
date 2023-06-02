import { useTexture } from "@react-three/drei";
import EarthDay from '../../assets/8k_earth_daymap.jpg';
import earthNormalMap from '../../assets/8k_earth_normal_map.jpg';
import earthSpecularMap from '../../assets/8k_earth_specular_map.jpg';
import earthDisplacementMap from '../../assets/earth_displacement.jpg';
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import Moon from "./Moon";
import ISS from "./ISS";

function Earth({ displacementScale, triangles }) {

    const earthRef = useRef();

    const [earthTexture, earthNormalMapTexture, earthSpecularMapTexture,
        earthDisplacementMapTexture] = useTexture([EarthDay, earthNormalMap, earthSpecularMap, earthDisplacementMap])

    useFrame(() => {
        earthRef.current.rotation.y += 0.001;
    })

    // args values = radius, x, y
    return (
        <group>
            <mesh receiveShadow ref={earthRef}>
                <sphereGeometry args={[1, triangles, triangles]} />
                <meshPhongMaterial
                    map={earthTexture}
                    normalMap={earthNormalMapTexture}
                    specularMap={earthSpecularMapTexture}
                    shininess={1000}
                    displacementMap={earthDisplacementMapTexture}
                    displacementScale={displacementScale}
                />
            </mesh>
            <ISS />
            <Moon />
        </group>
    )
}

export default Earth;
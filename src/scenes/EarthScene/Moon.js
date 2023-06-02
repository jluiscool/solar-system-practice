import { useTexture } from "@react-three/drei";
import moonDay from '../../assets/8k_moon.jpg';
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function Moon({ displacementScale, triangles }) {

    const moonRef = useRef();

    const [moonTexture] = useTexture([moonDay])
    const xAxis = 4;

    useFrame(({ clock }) => {
        //Axis rotation
        moonRef.current.rotation.y += 0.001;

        //Orbit Rotation
        moonRef.current.position.x = Math.sin(
            clock.getElapsedTime() * 0.8) * xAxis
        moonRef.current.position.z = Math.cos(
            clock.getElapsedTime() * 0.8) * xAxis
    })

    // args values = radius, x, y
    return (
        <mesh castShadow ref={moonRef}
            position={[xAxis, 0, 0]}>
            <sphereGeometry
                args={[0.5, triangles, triangles]}
            />
            <meshPhongMaterial
                map={moonTexture}
            />
        </mesh>
    )
}

export default Moon;
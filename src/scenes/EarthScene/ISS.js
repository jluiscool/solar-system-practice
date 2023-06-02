
import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import ISSModel from '../../assets/ISS_stationary.glb';
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function ISS() {

    const ISSref = useRef();

    const gltfISS = useGLTF(ISSModel)

    const memoizedISS = useMemo(() => {
        return gltfISS
    })

    const xAxis = 2;

    useFrame(({ clock }) => {


        //Orbit Rotation
        ISSref.current.position.x = Math.sin(
            clock.getElapsedTime() * 0.8) * xAxis
        ISSref.current.position.z = Math.cos(
            clock.getElapsedTime() * 0.8) * xAxis
    })

    return (
        <mesh >
            <primitive
                object={memoizedISS.scene}
                ref={ISSref}
                position={[xAxis, 0, 0]}
                scale={0.005}
            />
        </mesh>
    )
}

export default ISS;
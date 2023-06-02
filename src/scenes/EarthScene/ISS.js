
import { useGLTF } from "@react-three/drei";
import ISSModel from '../../assets/ISS_stationary.glb';
import { useFrame } from "@react-three/fiber";
import React, { useRef,useMemo, useCallback } from "react";

function ISS() {

    const ISSref = useRef();

    const gltfISS = useGLTF(ISSModel)

    const memoizedISS = useMemo(() => {
        return gltfISS
    }, [gltfISS])

    const xAxis = 2;
    
    const updateMoonPosition = useCallback((clock) => {
            //Orbit Rotation
            ISSref.current.position.x = Math.sin(
                clock.getElapsedTime() * 1) * xAxis
            ISSref.current.position.z = Math.cos(
                clock.getElapsedTime() * 1) * xAxis
    }, [])

    useFrame(({clock}) => {
        updateMoonPosition(clock)
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

export default React.memo(ISS);
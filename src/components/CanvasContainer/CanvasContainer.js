import { useHelper } from "@react-three/drei";
import AnimatedStars from "./AnimatedStars/AnimatedStars";
import Earth from "./Earth/Earth";
import { useRef } from "react";
import * as THREE from 'three';

function CanvasContainer() {

    const directionalLightRef = useRef();
    const directionalLightRef2 = useRef();

    useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1, 'hotpink')
    useHelper(directionalLightRef2, THREE.DirectionalLightHelper, 1, 'hotpink')

    return (
        <>
            <color attach="background" args={['black']}/>
            
            <AnimatedStars />
            <directionalLight 
            ref={directionalLightRef} 
            position={[0,0,10]} 
            // color={0xff0000}
            intensity={1}/>
            <directionalLight 
            ref={directionalLightRef2} 
            position={[0,0,-10]}/>
            <Earth displacementScale={0.15}/>
        </>
    )
}

export default CanvasContainer;
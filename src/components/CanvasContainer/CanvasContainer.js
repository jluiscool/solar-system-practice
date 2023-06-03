import { useHelper } from "@react-three/drei";
import AnimatedStars from "./AnimatedStars";
import Earth from "../../scenes/EarthScene/Earth";
import { useRef } from "react";
import * as THREE from 'three';
import Sun from "../../scenes/SunScene/Sun";
import Mercury from "../../scenes/MercuryScene/Mercury";
import Venus from '../../scenes/VenusScene/Venus';
import Mars from "../../scenes/MarsScene/Mars";
import Jupiter from "../../scenes/JupiterScene/Jupiter";
import Saturn from "../../scenes/SaturnScene/Saturn";
import Uranus from "../../scenes/UranusScene/Uranus";
import Neptune from "../../scenes/NeptuneScene/Neptune";
import Pluto from "../../scenes/PlutoScene/Pluto";
import CameraPositionLogging from "../../helpers/CameraPositionLogging";

function CanvasContainer({ triangles, displacement }) {

    const directionalLightRef = useRef();
    const directionalLightRef2 = useRef();

    useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1, 'hotpink')
    useHelper(directionalLightRef2, THREE.DirectionalLightHelper, 1, 'hotpink')

    return (
        <>
            <CameraPositionLogging event="mousedown" />
            <AnimatedStars />
            {/* <directionalLight
                castShadow
                ref={directionalLightRef}
                position={[0, 0, 10]}
                // color={0xff0000}
                intensity={1} />
            <directionalLight
                castShadow
                ref={directionalLightRef2}
                position={[0, 0, -10]} /> */}
            <ambientLight intensity={0.1}/>
            <Sun triangles={triangles} />
            <Mercury triangles={triangles} />
            <Venus triangles={triangles} />
            <Earth displacementScale={displacement} triangles={triangles} />
            <Mars triangles={triangles} />
            <Jupiter />
            <Saturn />
            <Uranus />
            <Neptune />
            <Pluto />
        </>
    )
}

export default CanvasContainer;
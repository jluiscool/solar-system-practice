import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useCallback, useEffect, useState } from "react";
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js'

import Moon from "./Moon";
import ISS from "./ISS";

import EarthDay from '../../assets/8k_earth_daymap.jpg';
import earthNormalMap from '../../assets/8k_earth_normal_map.jpg';
import earthSpecularMap from '../../assets/8k_earth_specular_map.jpg';
import earthDisplacementMap from '../../assets/earth_displacement.jpg';
import earthEmissiveMap from '../../assets/8k_earth_nightmap.jpg';


function Earth({ displacementScale, triangles }) {

    const earthRef = useRef()

    const clockRef = useRef(new THREE.Clock()) // Create a reference to the clock

    const { camera } = useThree()

    const [hovered, hover] = useState(false)
    const [followingEarth, setFollowingEarth] = useState(false)

    const [cameraPosition, setCameraPosition] = useState(
        new THREE.Vector3(16.14, 8.32, 19.81)
    )

    const [cameraTarget, setCameraTarget] = useState(new THREE.Vector3(0, 0, 0))

    const [earthTexture, earthNormalMapTexture, earthSpecularMapTexture,
        earthDisplacementMapTexture, earthEmissiveMapTexture] = useTexture([EarthDay, earthNormalMap, earthSpecularMap, earthDisplacementMap, earthEmissiveMap])

    const updateEarthPosition = useCallback(() => {
        // Calculate the Earth's position based on its angle from the Sun
        const angle = clockRef.current.getElapsedTime() * 0.5
        const distance = 14
        const x = Math.sin(angle) * distance
        const z = Math.cos(angle) * distance
        earthRef.current.position.set(x, 0, z)
        earthRef.current.rotation.y += 0.002
    }, [])

    const toggleFollowingEarth = () => {
        setFollowingEarth((prevFollowingEarth) => !prevFollowingEarth)
    }

    useEffect(() => {
        // console.log(new Tween)
        document.body.style.cursor = hovered ? 'pointer' : 'auto'
    }, [hovered])

    const tweenLogic = useCallback(() => {
        TWEEN.update()

        const earthPositionRef = earthRef.current.position

        if (followingEarth) {
            const cameraTargetPosition = new THREE.Vector3(
                earthPositionRef.x + 10,
                earthPositionRef.y + 2,
                earthPositionRef.z + 5
            )
            //Tween for camera position
            new TWEEN.Tween(cameraPosition)
                .to(cameraTargetPosition, 1000)
                .easing(TWEEN.Easing.Quadratic.Out)
                .onUpdate(() => {
                    setCameraPosition(cameraPosition)
                })
                .start()

            //Tween for camera targeting
            new TWEEN.Tween(cameraTarget)
                .to(earthPositionRef, 1000)
                .easing(TWEEN.Easing.Quadratic.Out)
                .onUpdate(() => {
                    setCameraTarget(cameraTarget)
                })
                .start()
        } else {
            const originalCameraPosition = new THREE.Vector3(16.14, 8.32, 19.81)
            const originalCameraTarget = new THREE.Vector3(0, 0, 0)
            //Tween to original position
            new TWEEN.Tween(cameraPosition)
                .to(originalCameraPosition, 1000)
                .easing(TWEEN.Easing.Quadratic.Out)
                .onUpdate(() => {
                    setCameraPosition(cameraPosition)
                })
                .start()
            //Tween to original target
            new TWEEN.Tween(cameraTarget)
                .to(originalCameraTarget, 1000)
                .easing(TWEEN.Easing.Quadratic.Out)
                .onUpdate(() => {
                    setCameraTarget(cameraTarget)
                })
                .start()
        }
        camera.lookAt(cameraTarget)
        camera.position.copy(cameraPosition)
        camera.updateProjectionMatrix()
    })

    useFrame(() => {
        updateEarthPosition()
        tweenLogic()
    })

    // args values = radius, x, y
    return (
        <group ref={earthRef}>
            <mesh castShadow receiveShadow
                onClick={toggleFollowingEarth}
                onPointerOut={() => { hover(false) }}
                onPointerOver={() => { hover(true) }}>
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
import sunModel from '../../assets/8k_sun.jpg'
import { useTexture } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function Sun({triangles}) {

    const sunRef = useRef();

    const [sunTexture] = useTexture([sunModel])

    useFrame(({ clock }) => {
        //Axis rotation
        sunRef.current.rotation.y -= 0.001;
    })

    return (
        <mesh ref={sunRef} position={[0, 0, 0]}>
            <sphereGeometry 
            args={[4, triangles, triangles]} 
            />
            <meshPhongMaterial
                map={sunTexture}
                emissiveMap={sunTexture}
                emissiveIntensity={0.6}
                emissive={0xffffff}
            />
            <pointLight castShadow intensity={1}/>
        </mesh>
    )
}

export default Sun;
import { Suspense } from 'react';
import './App.css';
import CanvasContainer from './components/CanvasContainer/CanvasContainer';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { useState } from 'react';

function App() {

  const [triangles, setTriangles] = useState(64)
  const [displacement, setDisplacement] = useState(0.1)

  return (
    <div className="App">
      <Canvas
        camera={{
          fov: 75,
          near: 0.1,
          far: 1000,
          position: [16, 8.5, 19.5]
        }}
        shadows
      >
        <Suspense fallback={null}>
          <Perf />
          <color attach="background" args={['black']} />
          <OrbitControls />
          <CanvasContainer triangles={triangles} displacement={displacement} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;

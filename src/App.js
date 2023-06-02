import { Suspense } from 'react';
import './App.css';
import CanvasContainer from './components/CanvasContainer/CanvasContainer';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function App() {
  return (
    <div className="App">
      <Canvas camera={{
        fov: 75,
        near: 0.1,
        far: 1000,
        position: [0, 3, 3]
      }}>
        <Suspense fallback={null}>
          <OrbitControls />
          <CanvasContainer />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;

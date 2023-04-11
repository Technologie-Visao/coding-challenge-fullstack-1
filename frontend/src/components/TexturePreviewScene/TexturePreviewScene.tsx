import { useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls} from '@react-three/drei';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useRef } from 'react';
import { Texture } from '../../types';

interface TexturePreviewProps {
    texture: Texture | null;
  }
  
function TexturePreviewScene({ texture }: TexturePreviewProps) {
    var colorMap = useLoader(TextureLoader, texture?.thumbnail_url );
    const sphereRef = useRef();
    useFrame(({ clock }) => {
      const a = clock.getElapsedTime();
      sphereRef.current.rotation.y = a / 6;
    });
  
    return (<>
     <ambientLight intensity={0.5} />
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial displacementScale={0.2} map={colorMap} />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.4}
        />
      </mesh>
    </>
    );
  }
  export default TexturePreviewScene
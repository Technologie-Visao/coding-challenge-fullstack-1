import { useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { Sphere3DProps } from '../../types/textures/card/3DTextureProps';


const Sphere3D = ({ textureUrl }: Sphere3DProps) => {
  const texture = useLoader(TextureLoader, textureUrl);

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[2, 2, 2]} intensity={0.5} />
      <pointLight position={[-2, 2, -2]} intensity={0.5} />
      <pointLight position={[2, -2, 2]} intensity={0.5} />
      <pointLight position={[-2, -2, -2]} intensity={0.5} />
      <mesh>
        <sphereGeometry args={[3, 64, 64]} />
        <meshPhysicalMaterial map={texture} roughness={1} metalness={0.5} />
        <OrbitControls enableZoom={false} autoRotate={true}/>
      </mesh>
      <Environment preset="sunset" />
    </>
  );
};

export default Sphere3D;

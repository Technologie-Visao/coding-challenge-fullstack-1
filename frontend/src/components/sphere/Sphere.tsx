import { createRoot } from 'react-dom/client';
import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

function filePaths(names) {
  return names.map((name) => `Bark012_1K-JPG/${name}.jpg`);
}
function Sphere(props) {
  // load textures
  const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(
    TextureLoader,
    filePaths([
      'Bark012_1K_Color',
      'Bark012_1K_Displacement',
      'Bark012_1K_NormalGL',
      'Bark012_1K_Roughness',
      'Bark012_1K_AmbientOcclusion',
    ]),
  );

  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    ref.current.rotation.y += delta / 3;
    ref.current.rotation.x += delta / 4;
  });
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      // scale={clicked ? 1.5 : 1}
      scale={2}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <sphereGeometry args={[1, 36, 36]} />
      <meshStandardMaterial
        color="rgb(199, 158, 34)"
        // displacementScale={0.2}
        map={colorMap}
        // displacementMap={displacementMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        aoMap={aoMap}
      />
    </mesh>
  );
}

export default Sphere;

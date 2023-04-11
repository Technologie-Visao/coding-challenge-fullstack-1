import { SearchBar, TexturePreviewScene } from './components';
import {Stars } from '@react-three/drei';
import { Texture }  from './types';
import { Canvas} from '@react-three/fiber';
import './app.css';

import { Suspense, useState } from 'react';

function App() {
  const [selectedTexture, setSelectedTexture] = useState<Texture | null>(null);

  return (
    <div id="app">
      <SearchBar onSelectTexture={setSelectedTexture} />
      <Canvas>
        <Suspense fallback={null}>
        <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
          {selectedTexture && <TexturePreviewScene texture={selectedTexture} />}
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;

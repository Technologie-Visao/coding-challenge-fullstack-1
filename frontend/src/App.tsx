import React, { useState } from 'react';
import Autocomplete from './components/Autocomplete';
import TextureCard from './components/TextureCard';
import { Suggestion } from './services/textureService';
import styles from './App.module.css';

function App() {
  const [selectedTexture, setSelectedTexture] = useState<Suggestion | null>(
    null,
  );
  const [cardRemoved, setCardRemoved] = useState(false);

  const handleTextureSelection = (texture: Suggestion) => {
    setSelectedTexture(texture);
    setCardRemoved(false);
  };

  const handleCardRemoved = () => {
    setSelectedTexture(null);
    setCardRemoved(true);
  };

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <h1>Texture Search</h1>
        <Autocomplete
          onTextureSelection={handleTextureSelection}
          cardRemoved={cardRemoved}
        />
      </header>
      <div className={styles.cardContainer}>
        {selectedTexture && (
          <TextureCard
            texture={selectedTexture}
            onCardRemoved={handleCardRemoved}
          />
        )}
      </div>
    </div>
  );
}

export default App;

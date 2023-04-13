import React, { useState } from 'react';
import styles from './TextureCard.module.css';
import { Suggestion } from '../services/textureService';

interface TextureCardProps {
  texture: Suggestion;
  onCardRemoved: () => void;
}

const TextureCard: React.FC<TextureCardProps> = ({
  texture,
  onCardRemoved,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleRemoveButtonClick = () => {
    setIsVisible(false);
    onCardRemoved();
  };

  return isVisible ? (
    <div className={styles.card}>
      <div className={styles.imageColumn}>
        <img
          className={styles.image}
          src={texture.thumbnail_url}
          alt={texture.name}
        />
      </div>
      <div className={styles.detailsColumn}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>{texture.name}</h2>
        </div>
        <div className={styles.descriptionRow}>
          <p className={styles.description}>{texture.description}</p>
        </div>
      </div>
      <button className={styles.removeButton} onClick={handleRemoveButtonClick}>
        ×
      </button>
    </div>
  ) : null;
};

export default TextureCard;

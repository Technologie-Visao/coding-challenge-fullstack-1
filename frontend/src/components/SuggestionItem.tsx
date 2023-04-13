import React from 'react';
import { Suggestion } from '../services/textureService';
import styles from './SuggestionItem.module.css';

interface SuggestionItemProps {
  suggestion: Suggestion;
  isSelected: boolean;
  onClick: () => void;
}

const SuggestionItem: React.FC<SuggestionItemProps> = ({
  suggestion,
  isSelected,
  onClick,
}) => {
  return (
    <li className={isSelected ? styles.selected : undefined} onClick={onClick}>
      <img src={suggestion.thumbnail_url} alt={suggestion.name} />
      <div>
        <strong>{suggestion.name}</strong>
        <p>{suggestion.description}</p>
      </div>
    </li>
  );
};

export default SuggestionItem;

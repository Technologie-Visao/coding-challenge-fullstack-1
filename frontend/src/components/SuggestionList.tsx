import React from 'react';
import { Suggestion } from '../services/textureService';
import SuggestionItem from './SuggestionItem';
import styles from './SuggestionList.module.css';

interface SuggestionListProps {
  suggestions: Suggestion[];
  selectedSuggestion: number;
  onSuggestionClick: (suggestion: Suggestion) => void;
}

const SuggestionList: React.FC<SuggestionListProps> = ({
  suggestions,
  selectedSuggestion,
  onSuggestionClick,
}) => {
  const listRef = React.useRef<HTMLUListElement>(null);

  if (suggestions.length === 0) {
    return null;
  }

  React.useEffect(() => {
    if (
      listRef.current &&
      selectedSuggestion >= 0 &&
      listRef.current.children.length > 0
    ) {
      const selectedItem = listRef.current.children[
        selectedSuggestion
      ] as HTMLElement;
      const listTop = listRef.current.scrollTop;
      const listBottom = listTop + listRef.current.clientHeight;
      const selectedItemTop = selectedItem.offsetTop;
      const selectedItemBottom = selectedItemTop + selectedItem.clientHeight;

      if (selectedItemTop < listTop) {
        listRef.current.scrollTop = selectedItemTop;
      } else if (selectedItemBottom > listBottom) {
        listRef.current.scrollTop =
          selectedItemBottom - listRef.current.clientHeight;
      }
    }
  }, [selectedSuggestion, suggestions]);

  return (
    <ul className={styles.suggestionsList} ref={listRef}>
      {suggestions.map((suggestion, index) => (
        <SuggestionItem
          key={suggestion.name}
          suggestion={suggestion}
          isSelected={index === selectedSuggestion}
          onClick={() => onSuggestionClick(suggestion)}
        />
      ))}
    </ul>
  );
};

export default SuggestionList;

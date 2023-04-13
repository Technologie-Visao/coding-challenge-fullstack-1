import React, { useState } from 'react';
import { fetchSuggestions, Suggestion } from '../services/textureService';
import InputSection from './InputSection';
import SuggestionList from './SuggestionList';
import styles from './Autocomplete.module.css';

interface AutocompleteProps {
  onTextureSelection: (texture: Suggestion) => void;
  cardRemoved: boolean;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  onTextureSelection,
  cardRemoved,
}) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const [limit, setLimit] = useState(5);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [error, setError] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setShowSuggestions(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    switch (key) {
      case 'ArrowUp':
        if (selectedSuggestion > 0) {
          setSelectedSuggestion(selectedSuggestion - 1);
        }
        break;
      case 'ArrowDown':
        if (selectedSuggestion < suggestions.length - 1) {
          setSelectedSuggestion(selectedSuggestion + 1);
        }
        break;
      case 'Enter':
        if (
          selectedSuggestion >= 0 &&
          selectedSuggestion < suggestions.length
        ) {
          setInput(suggestions[selectedSuggestion].name);
          setSuggestions([]);
          setSelectedSuggestion(-1);
          setShowSuggestions(false);
          onTextureSelection(suggestions[selectedSuggestion]);
        }
        break;
    }
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLimit = parseInt(e.target.value, 10);
    setLimit(newLimit);
    setError(newLimit < 1 || newLimit > 5);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setInput(suggestion.name);
    setSuggestions([]);
    setSelectedSuggestion(-1);
    setShowSuggestions(false);
    onTextureSelection(suggestion);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      e.target instanceof Element &&
      !e.target.closest(`.${styles.autocomplete}`)
    ) {
      setShowSuggestions(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    const fetchSuggestionsAsync = async () => {
      if (input.length >= 2) {
        try {
          const data = await fetchSuggestions(input, limit);
          setSuggestions(data);
        } catch (error) {
          console.error(error);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestionsAsync();
  }, [input, limit]);

  React.useEffect(() => {
    if (cardRemoved) {
      setInput('');
      setShowSuggestions(true);
    }
  }, [cardRemoved]);

  return (
    <div className={styles.autocomplete}>
      <InputSection
        inputValue={input}
        limitValue={limit}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onLimitChange={handleLimitChange}
        onFocus={() => setShowSuggestions(true)}
        error={error}
      />
      {showSuggestions && suggestions.length > 0 && input.length >= 2 && (
        <SuggestionList
          suggestions={suggestions}
          selectedSuggestion={selectedSuggestion}
          onSuggestionClick={handleSuggestionClick}
        />
      )}
    </div>
  );
};

export default Autocomplete;

import React, { useState, useEffect } from 'react';
import './Autocomplete.css';

interface AutocompleteProps {
  placeholder: string;
  noSuggestionsText: string;
}

interface Suggestion {
  name: string;
  description: string;
  thumbnail_url: string;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  placeholder,
  noSuggestionsText,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    if (searchTerm.length >= 1) {
      const apiUrl = `http://localhost:3001/textures/suggestions?term=${searchTerm}&limit=5`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((suggestions) => {
          setSuggestions(suggestions);
        });
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion: Suggestion, index: number) => (
            <li key={index}>
              <img
                src={suggestion.thumbnail_url}
                alt={suggestion.name}
                width="50"
                height="50"
              />
              <div>
                <h4>{suggestion.name}</h4>
                <p>{suggestion.description}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      {searchTerm.length >= 1 && suggestions.length === 0 && (
        <p>{noSuggestionsText}</p>
      )}
    </div>
  );
};

export default Autocomplete;

import { useState, useEffect } from 'react';
import { fetchSuggestions, Suggestion } from '../services/textureService';

const useSuggestions = (input: string, limit: number) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
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

  return suggestions;
};

export default useSuggestions;

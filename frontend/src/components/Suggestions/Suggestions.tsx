import { useEffect } from 'react';
import axios from 'axios';
import './Suggestions.css';

function Suggestion(props: any) {
  useEffect(() => {
    if (props.searchTerm.length < 2) {
      props.changeSuggestions([]);
      return;
    }
    const fetchSuggestions = async () => {
      const response = await axios.get(
        `http://localhost:5000/textures/suggestions?search_term=${props.searchTerm}&limit=${props.limit}`,
      );
      props.changeSuggestions(response.data);
    };
    fetchSuggestions();
  }, [props.searchTerm]);

  const handleSuggestionClick = (suggestion: any) => {
    props.changeSearchTerm(suggestion.name);
    props.changeSuggestions([]);
  };

  return (
    <div className="autocomplete-suggestions-wrapper">
      <ul className="autocomplete-suggestions">
        {props.suggestions.map((suggestion: any) => (
          <li
            className="autocomplete-suggestion"
            key={suggestion.name}
            onClick={() => handleSuggestionClick(suggestion)}
          >
            <img
              className="autocomplete-suggestion-thumbnail"
              src={suggestion.thumbnail_url}
              alt={suggestion.name}
            />
            <div className="autocomplete-suggestion-information">
              <h3>{suggestion.name}</h3>
              <p>{suggestion.description}</p>
            </div>
          </li>
        ))}
        {props.suggestions.length === 0 && (
          <li className="autocomplete-no-suggestions">No suggestions found.</li>
        )}
      </ul>
    </div>
  );
}

export default Suggestion;

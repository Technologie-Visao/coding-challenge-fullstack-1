import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './Suggestions.css';
import { Modal } from '../Modal';
import {
  SearchTermContext,
  SuggestionContext,
  LimitContext,
} from '../../hooks/';

function Suggestions() {
  const { term } = useContext(SearchTermContext);
  const { suggestions, changeSuggestions } = useContext(SuggestionContext);
  const { limit } = useContext(LimitContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(suggestions[0]);

  useEffect(() => {
    if (term.length < 2) {
      changeSuggestions([]);
      return;
    }
    const fetchSuggestions = async () => {
      const response = await axios.get(
        `http://localhost:5000/textures/suggestions?search_term=${term}&limit=${limit}`,
      );
      changeSuggestions(response.data);
    };
    fetchSuggestions();
  }, [term, limit]);

  const handleOpenModal = (suggestion: any) => {
    setIsModalOpen(true);
    setModalContent(suggestion);
  };

  return (
    <div className="autocomplete-suggestions-wrapper">
      <ul className="autocomplete-suggestions">
        {suggestions.map((suggestion: any) => (
          <li
            className="autocomplete-suggestion"
            key={suggestion.name}
            onClick={() => handleOpenModal(suggestion)}
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
        {suggestions.length === 0 && (
          <li className="autocomplete-no-suggestions">No suggestions found.</li>
        )}
      </ul>
      {isModalOpen && (
        <Modal suggestion={modalContent} closeModal={setIsModalOpen} />
      )}
    </div>
  );
}

export default Suggestions;

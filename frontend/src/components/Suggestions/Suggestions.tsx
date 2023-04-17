import { useEffect, useState } from 'react';
import axios from 'axios';
import './Suggestions.css';
import { Modal } from '../Modal';

function Suggestions(props: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(props.suggestions[0]);

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

  const handleOpenModal = (suggestion: any) => {
    setIsModalOpen(true);
    setModalContent(suggestion);
  };

  return (
    <div className="autocomplete-suggestions-wrapper">
      <ul className="autocomplete-suggestions">
        {props.suggestions.map((suggestion: any) => (
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
        {props.suggestions.length === 0 && (
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

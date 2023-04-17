import { useContext } from 'react';
import { SearchTermContext, SuggestionContext } from '../../hooks';
import './DeleteButton.css';

function DeleteButton() {
  const { changeTerm } = useContext(SearchTermContext);
  const { changeSuggestions } = useContext(SuggestionContext);

  const setSearchTerm = () => {
    changeTerm('');
  };
  const setSuggestions = () => {
    changeSuggestions([]);
  };

  const handleDelete = () => {
    setSearchTerm();
    setSuggestions();
  };
  return (
    <button className="delete-button" onClick={handleDelete}>
      Clear
    </button>
  );
}

export default DeleteButton;

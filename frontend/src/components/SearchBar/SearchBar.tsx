import { useContext } from 'react';
import { SearchTermContext, LimitContext } from '../../hooks';
import { DeleteButton } from '../DeleteButton';
import './SearchBar.css';

function SearchBar() {
  const { term, changeTerm } = useContext(SearchTermContext);
  const { limit, changeLimit } = useContext(LimitContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeTerm(event.target.value);
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const limit = parseInt(event.target.value, 10);
    changeLimit(limit);
  };

  const renderOptions = () => {
    let options = [];
    for (let i: number = 1; i <= 10; i++) {
      options[i] = (
        <option value={i} key={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  return (
    <div className="autocomplete-searchBar-wrapper">
      <h1 className="autocomplete-title">Search for a texture</h1>
      <div className="autocomplete-searching-area">
        <DeleteButton />
        <div className="autocomplete-input-wrapper">
          <input
            id="input"
            className="autocomplete-input"
            type="text"
            value={term}
            onChange={handleInputChange}
            placeholder="Type here to search for a texture..."
          />
          <select
            id="limit-selector"
            className="autocomplete-limit-selector"
            value={limit}
            onChange={handleLimitChange}
          >
            {renderOptions()}
          </select>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;

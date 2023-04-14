import { useState } from 'react';
import { useSearchSuggestionsQuery } from '~/redux/services/suggestionsApi';
import SuggestionList from '../suggestion-list/SuggestionList';
import styles from './styles.module.scss';

/**
 * Autocomplete search bar
 */
function SearchBar() {
  const [search, setSearch] = useState('');
  const { data = [] } = useSearchSuggestionsQuery({ search });

  // set search to the name of the selected suggestion
  function handleSelected(suggestion: Suggestion) {
    setSearch(suggestion.name);
  }

  // select the top suggestion when enter is pressed
  function handleEnter(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      const topSuggestion = data[0];
      if (topSuggestion) {
        setSearch(topSuggestion.name);
      }
    }
  }

  // clear input
  function clear() {
    setSearch('');
  }

  return (
    <div className={styles.container}>
      {/* Search */}
      <div className={styles['search-bar-container']}>
        {/* Input */}
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleEnter}
        />
        {/* Clear */}
        <button onClick={clear}>Clear</button>
      </div>
      {/* Dropdown */}
      <div className={styles.dropdown}>
        <SuggestionList suggestions={data} onSelected={handleSelected} />
      </div>
    </div>
  );
}

export default SearchBar;

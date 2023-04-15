import { useState } from 'react';
import { useSearchSuggestionsQuery } from '~/redux/services/suggestionsApi';
import SuggestionList from '../suggestion-list/SuggestionList';
import styles from './styles.module.scss';
import useSelectedSuggestion from '~/hooks/useSelectedSuggestion';
import useFocus from '~/hooks/useFocus';
import useHelperText from '~/hooks/useHelperText';

/**
 * Autocomplete search bar
 */
function SearchBar() {
  // search input
  const [search, setSearch] = useState('');
  // retrieved suggestions
  const { data: suggestions = [] } = useSearchSuggestionsQuery({ search });
  // select suggestion using up and down arrows
  const { selectedSuggestion, increment, decrement } = useSelectedSuggestion(
    search,
    suggestions,
  );
  // focus
  const { focused, onFocus, wrapperRef } = useFocus();
  // helper text
  const { isSearchLongEnough, helperText } = useHelperText(search, suggestions);

  // set search to the name of the selected suggestion
  function handleSelected(suggestion: Suggestion) {
    setSearch(suggestion.name);
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      // use selected suggestion
      if (selectedSuggestion) setSearch(selectedSuggestion.name);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault(); // prevent the cursor from moving
      increment();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault(); // prevent the cursor from moving
      decrement();
    }
  }

  // clear input
  function clear() {
    setSearch('');
  }

  return (
    // Container
    <div className={styles.container} ref={wrapperRef} onFocus={onFocus}>
      {/* Search */}
      <div className={styles['search-bar-container']}>
        {/* Input */}
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        {/* Clear */}
        <button onClick={clear}>Clear</button>
      </div>
      {/* Dropdown */}
      {focused && (
        <div className={styles.dropdown}>
          <p>{helperText}</p>
          {isSearchLongEnough && (
            <SuggestionList
              suggestions={suggestions}
              selectedSuggestion={selectedSuggestion}
              onSelected={handleSelected}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;

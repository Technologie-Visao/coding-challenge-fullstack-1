import { useState, useEffect, useRef } from 'react';
import { useSearchSuggestionsQuery } from '~/redux/services/suggestionsApi';
import SuggestionList from '../suggestion-list/SuggestionList';
import styles from './styles.module.scss';
import useClickOutside from '~/hooks/useClickOutside';

/**
 * Autocomplete search bar
 */
function SearchBar() {
  // search input
  const [search, setSearch] = useState('');
  // retrieved suggestions
  const { data: suggestions = [] } = useSearchSuggestionsQuery({ search });
  // select suggestion using up and down arrows
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const selectedSuggestion: Suggestion | undefined = suggestions[selectedIndex];

  // focus
  const [focused, setFocused] = useState(false);
  const wrapperRef = useRef(null); // using onBlur doesn't work when clicking on a dropdown item
  useClickOutside(wrapperRef, () => setFocused(false));

  // reset selectedIndex for each character typed
  useEffect(() => {
    setSelectedIndex(-1);
  }, [search]);

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
      // increment
      setSelectedIndex((selectedIndex) =>
        Math.min(selectedIndex + 1, suggestions.length - 1),
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault(); // prevent the cursor from moving
      // decrement
      setSelectedIndex((selectedIndex) => Math.max(selectedIndex - 1, 0));
    }
  }

  // clear input
  function clear() {
    setSearch('');
  }

  return (
    // Container
    <div
      className={styles.container}
      ref={wrapperRef}
      onFocus={() => setFocused(true)}
    >
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
          <SuggestionList
            suggestions={suggestions}
            selectedSuggestion={selectedSuggestion}
            onSelected={handleSelected}
          />
        </div>
      )}
    </div>
  );
}

export default SearchBar;

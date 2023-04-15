import { useState, useEffect, useRef } from 'react';
import { useSearchSuggestionsQuery } from '~/redux/services/suggestionsApi';
import SuggestionList from '../suggestion-list/SuggestionList';
import styles from './styles.module.scss';

/**
 * Hook that alerts clicks outside of the passed ref
 * https://stackoverflow.com/a/42234988/20898396
 */
function useOutsideAlerter(ref, onClickOutside) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

/**
 * Autocomplete search bar
 */
function SearchBar() {
  const [search, setSearch] = useState('');
  const { data = [] } = useSearchSuggestionsQuery({ search });

  // focus
  const [focused, setFocused] = useState(false);
  const wrapperRef = useRef(null); // using onBlur doesn't work when clicking on a dropdown item
  useOutsideAlerter(wrapperRef, () => setFocused(false));

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
          onKeyDown={handleEnter}
        />
        {/* Clear */}
        <button onClick={clear}>Clear</button>
      </div>
      {/* Dropdown */}
      {focused && (
        <div className={styles.dropdown}>
          <SuggestionList suggestions={data} onSelected={handleSelected} />
        </div>
      )}
    </div>
  );
}

export default SearchBar;

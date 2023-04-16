import { useState } from 'react';
import { useSearchSuggestionsQuery } from '~/redux/services/suggestionsApi';
import SuggestionList from '../suggestion-list/SuggestionList';
import styles from './styles.module.scss';
import useSelectedSuggestion from '~/hooks/useSelectedSuggestion';
import useFocus from '~/hooks/useFocus';
import Dropdown from '../dropdown/Dropdown';
import SearchIcon from '../icons/search/SearchIcon';
import ClearIcon from '../icons/clear/ClearIcon';
import HelperText, { MIN_CHARACTERS } from '../helper-text/HelperText';
import ScrollContainer from '../scroll-container/ScrollContainer';

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
        {/* <div className={styles['search-bar-wrapper']}> */}
        <SearchIcon elevate={focused} />
        {/* Input */}
        <input
          type="text"
          placeholder="Search in the market"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        {/* Clear */}
        <ClearIcon hide={search.length === 0} onClick={clear} />
        {/* </div> */}
      </div>
      {/* Dropdown */}
      {focused && search !== '' && (
        <Dropdown>
          <ScrollContainer>
            <HelperText search={search} suggestions={suggestions} />
            {search.length >= MIN_CHARACTERS && (
              <SuggestionList
                suggestions={suggestions}
                selectedSuggestion={selectedSuggestion}
                onSelected={handleSelected}
              />
            )}
          </ScrollContainer>
        </Dropdown>
      )}
    </div>
  );
}

export default SearchBar;

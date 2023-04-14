import { useState } from 'react';
import { useSearchSuggestionsQuery } from '~/redux/services/suggestionsApi';
import SuggestionList from '../suggestion-list/SuggestionList';

function SearchBar() {
  const [search, setSearch] = useState('');
  const { data = [] } = useSearchSuggestionsQuery({ search });

  return (
    <>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <SuggestionList suggestions={data} />
    </>
  );
}

export default SearchBar;

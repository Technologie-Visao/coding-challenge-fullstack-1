import { useState } from 'react';
import { SearchBar, Suggestions } from './components';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Array<Object>>([]);
  const [limit, setLimit] = useState<number>(5);

  return (
    <div className="autocomplete-wrapper">
      <SearchBar
        searchTerm={searchTerm}
        changeSearchTerm={setSearchTerm}
        limit={limit}
        changeLimit={setLimit}
      />
      <Suggestions
        suggestions={suggestions}
        changeSuggestions={setSuggestions}
        searchTerm={searchTerm}
        changeSearchTerm={setSearchTerm}
        limit={limit}
      />
    </div>
  );
}

export default App;

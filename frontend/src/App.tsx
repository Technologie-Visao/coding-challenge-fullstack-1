import { SearchBar, Suggestions } from './components';
import './App.css';
import { SearchTermProvider, SuggestionProvider, LimitProvider } from './hooks';

function App() {
  const handleKeyPressed = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { key } = event;
    if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'Enter') {
      document.getElementById('autocomplete-suggestion-selected')?.focus();
    }
  };

  return (
    <SearchTermProvider>
      <SuggestionProvider>
        <LimitProvider>
          <div className="autocomplete-wrapper" onKeyDown={handleKeyPressed}>
            <SearchBar />
            <Suggestions />
          </div>
        </LimitProvider>
      </SuggestionProvider>
    </SearchTermProvider>
  );
}

export default App;

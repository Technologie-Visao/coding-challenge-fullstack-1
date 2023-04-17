import { SearchBar, Suggestions } from './components';
import './App.css';
import { SearchTermProvider, SuggestionProvider, LimitProvider } from './hooks';

function App() {
  return (
    <SearchTermProvider>
      <SuggestionProvider>
        <LimitProvider>
          <div className="autocomplete-wrapper">
            <SearchBar />
            <Suggestions />
          </div>
        </LimitProvider>
      </SuggestionProvider>
    </SearchTermProvider>
  );
}

export default App;

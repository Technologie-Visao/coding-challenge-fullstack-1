import React from 'react';
import './App.css';
import Autocomplete from './components/Autocomplete';
import { textConstants } from './assets/string';

function App() {
  return (
    <div className="app gradient-background">
      <header>
        <h1>Texture Search</h1>
        <Autocomplete
          placeholder={textConstants.SEARCH_PLACEHOLDER}
          noSuggestionsText={textConstants.NO_SUGGESTIONS_FOUND}
        />
      </header>
    </div>
  );
}

export default App;

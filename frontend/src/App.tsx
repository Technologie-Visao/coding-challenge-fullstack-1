import { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Find your Texture!</h1>
      <SearchBar />
    </div>
  );
}

export default App;

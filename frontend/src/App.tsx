import { useEffect, useState } from 'react';
import './App.css';

interface Texture {
  name: string;
  description: string;
  thumbnail_url: string;
}

function App() {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<Texture[]>([]);
  const [selected, setSelected] = useState<number>(-1);
  const [noSuggestions, setNoSuggestions] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(5);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (search.length >= 2) {
        const response = await fetch(
          `http://localhost:5000/textures/suggestions?search=${search}&limit=${limit}`,
        );
        const data = await response.json();
        if (response.ok) {
          setSuggestions(data);
          setNoSuggestions(data.length === 0);
        }
      } else {
        setSuggestions([]);
        setNoSuggestions(false);
      }
    };
    fetchSuggestions();
  }, [search]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setSelected(-1);
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value >= 0 || value === undefined) {
      setLimit(value);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && selected !== -1) {
      setSearch(suggestions[selected]?.name);
    } else if (event.key === 'ArrowUp' && selected > 0) {
      setSelected(selected - 1);
    } else if (event.key === 'ArrowDown' && selected < suggestions.length - 1) {
      setSelected(selected + 1);
    }
  };

  const handleSuggestionClick = (index: number) => {
    setSearch(suggestions[index].name);
    setSelected(index);
  };

  return (
    <div className="mainPage">
      <h2>Start typing to find a texture</h2>
      <div className="inputs">
        <label>
          Limit of elements to show :
          <input
            id="limit-input"
            type="number"
            value={limit}
            onChange={handleLimitChange}
            className="limitInput"
            min="0"
          />
        </label>

        <input
          type="text"
          value={search}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="autocompleteInput"
        />
      </div>
      {noSuggestions ? (
        <div>No suggestions found.</div>
      ) : (
        <ul className="list">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(index)}
              className={index === selected ? 'selected' : ''}
            >
              <img src={suggestion.thumbnail_url} alt={suggestion.name} />
              <div>
                <div>{suggestion.name}</div>
                <div>{suggestion.description.slice(0, 50)}...</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

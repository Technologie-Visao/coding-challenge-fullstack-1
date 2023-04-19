import React, { useState, useEffect, useRef } from 'react';
import './SearchBar.css';

interface Texture {
  name: string;
  description: string;
  thumbnail_url: string;
}

const Autocomplete: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Texture[]>([]);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    if (searchTerm.length > 1) {
      fetch(
        `http://localhost:8000/textures/suggestions?searchTerm=${searchTerm}&limit=${limit}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )
        .then((res) => res.json())
        .then((data) => {
          setSuggestions(data.data);
        })
        .catch((error) => console.error(error));
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, limit]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(Number(event.target.value));
  };

  const handleSuggestionClick = (texture: Texture) => {
    window.alert(texture.name);
  };

  const handleKeyDown = (texture: Texture) => {
    window.alert(texture.name);
  };

  return (
    <div>
      <div>
        <input type="text" value={searchTerm} onChange={handleInputChange} />
        <span>Limit: </span>
        <input type="text" value={limit} onChange={handleLimitChange} />
      </div>

      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((texture, index) => (
            <li
              key={texture.name}
              onClick={() => handleSuggestionClick(texture)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleKeyDown(texture);
                }
              }}
            >
              <img src={texture.thumbnail_url} alt={texture.name} />
              <div>
                <div>{texture.name}</div>
                <div>{texture.description}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {suggestions.length === 0 && searchTerm.length > 1 && (
        <div>No suggestions found</div>
      )}
    </div>
  );
};

export default Autocomplete;

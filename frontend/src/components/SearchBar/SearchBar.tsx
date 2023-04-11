import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Texture } from '../../types';
import './SearchBar.css';

interface SearchBarProps {
  onSelectTexture: (texture: Texture) => void;
}

function SearchBar({ onSelectTexture }: SearchBarProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/textures/suggestions?q=${inputValue}`,
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    if (inputValue.length >= 2) {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSuggestionClick = (texture: Texture) => {
    setInputValue(texture.name);
    onSelectTexture(texture);
  };

  const handleKeyDown = (e: React.KeyboardEvent, texture: Texture) => {
    if (e.key === 'Enter') {
      setInputValue(texture.name);
      onSelectTexture(texture);
    }
  };

  const mouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.focus();
  };

  const mouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.blur();
  };

  return (
    <>
      <div className="searchbar-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search database or type a texture"
          value={inputValue}
          onChange={handleInputChange}
        />
        <div className="icon">
          <i className="fa fa-search"></i>
        </div>
        <div className="suggestion-box">
          {loading && <div>Loading...</div>}
          {!loading && inputValue.length >= 2 && suggestions.length === 0 && (
            <div>No suggestions found.</div>
          )}
          {!loading && inputValue.length >= 2 && suggestions.length > 0 && (
            <ul>
              {suggestions.map((texture) => (
                <li
                  className="suggestion"
                  key={texture.name}
                  onClick={() => handleSuggestionClick(texture)}
                  onMouseEnter={mouseEnter}
                  onMouseLeave={mouseLeave}
                  onKeyDown={(e) => handleKeyDown(e, texture)}
                  tabIndex={-1}
                >
                  <img className="thumbnail" src={texture.thumbnail_url}></img>
                  <div className="name-description">
                    <span className="name">{texture.name}</span>
                    <div className="description">{texture.description}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchBar;

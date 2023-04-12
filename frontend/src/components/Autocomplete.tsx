import {useEffect, useRef, useState} from "react";

interface Suggestions {
  name: string;
  description: string;
  thumbnail_url: string;
}

function Autocomplete() {

  const LIMIT = 5;
  const ENDPOINT = "http://localhost:8000/textures/suggestions";
  const [suggestions, setSuggestions] = useState<Suggestions[]>([]);
  const [selection, setSelection] = useState<Suggestions>({} as Suggestions);
  const [message, setMessage] = useState("Kindly enter 2 characters or more.");
  const inputRef = useRef<HTMLInputElement>(null); // useRef simplifies manipulating input tag's events

  async function getSuggestions(searchTerm: string, limit: string) {
    const url = new URL(ENDPOINT);
    url.searchParams.append("search_term", searchTerm);
    url.searchParams.append("limit", limit);
    const response = await fetch(url.toString());
    return await response.json();
  }

  function renderData(message: string, data: Suggestions[]) {
    setMessage(message);
    setSuggestions(data);
  }

  function Selection() {
    return (
      <div id="selection" className={selection?.name ? "active" : "empty"}>
        <div className="suggestion">
          {selection?.thumbnail_url && (
            <div className="suggestion-img">
              <img src={selection.thumbnail_url} alt={selection.name}/>
            </div>
          )}
          <div className="suggestion-text">
            <div className="suggestion-name">{selection?.name}</div>
            <div className="suggestion-description">
              {selection?.description?.length > 100 ? selection.description.slice(0, 100) + "..." : selection?.description}
            </div>
          </div>
        </div>
        <div id={"delete"} onClick={handleDelete}>
          {selection?.name ? "Remove" : ""}
        </div>
      </div>
    )
  }

  function handleDelete() {
    setSelection({} as Suggestions);
    const input = inputRef.current;
    if (input) input.value = "";
  }

  function handleSelection(index: number) {
    setSelection(suggestions[index]);
    setSuggestions([])
  }

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    async function handler(event: Event) {
      if (selection) setSelection({} as Suggestions);
      const value = (event.target as HTMLInputElement)?.value;
      if (value.length < 2) {
        renderData("Kindly enter 2 characters or more.", [])
      } else {
        const data = await getSuggestions(value, LIMIT.toString());
        if (data.length < 1) {
          renderData("No results found.", [])
        } else {
          renderData("François Boulay-Handfield's Assignment", data);
        }
      }
    }

    input.addEventListener("input", handler);

    // clean up
    return () => {
      input.removeEventListener("input", handler);
    };
  }, []);


  const PLACEHOLDER = "Search for a texture [...]";
  return (
    <div id="autocomplete-content">
      <div id="autocomplete-content-wrapper">
        <h2 id={"message"}>{message}</h2>
        <input
          id="user-input"
          type="text"
          placeholder={PLACEHOLDER}
          ref={inputRef}
        />
        <Selection/>
        <div id="suggestions">
          {suggestions.map((suggestion, index) => (
            <div className="suggestion" key={index} onClick={() => handleSelection(index)}>
              <div className="suggestion-img">
                <img src={suggestion.thumbnail_url} alt={suggestion.name}/>
              </div>
              <div className="suggestion-text">
                <div className="suggestion-name">{index + 1}. {suggestion.name}</div>
                <div className="suggestion-description">
                  {suggestion.description.length > 100 ? suggestion.description.slice(0, 100) + "..." : suggestion.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Autocomplete;

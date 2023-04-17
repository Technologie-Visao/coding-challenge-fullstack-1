import './SearchBar.css';

function SearchBar(props: any) {
  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    props.changeSearchTerm(value);
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const limit = parseInt(event.target.value, 10);
    props.changeLimit(limit);
  };

  const renderOptions = () => {
    let options = [];
    for (let i: number = 1; i <= 10; i++) {
      options[i] = (
        <option value={i} key={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  return (
    <div className="autocomplete-searchBar-wrapper">
      <h1 className="autocomplete-title">Search for a texture</h1>
      <div className="autocomplete-searching-area">
        <div className="autocomplete-input-wrapper">
          <input
            id="input"
            className="autocomplete-input"
            type="text"
            value={props.searchTerm}
            onChange={handleSearchTermChange}
            placeholder="Type here to search for a texture..."
          />
          <select
            id="limit-selector"
            className="autocomplete-limit-selector"
            value={props.limit}
            onChange={handleLimitChange}
          >
            {renderOptions()}
          </select>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;

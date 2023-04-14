type SuggestionItemProps = {
  suggestion: SearchedSuggestion;
};

function SuggestionItem({ suggestion }: SuggestionItemProps) {
  return (
    <li>
      <h1>{suggestion.name}</h1>
      <p>{suggestion.description}</p>
      <p>{suggestion.score}</p>
      <img src={suggestion.thumbnail_url} />
    </li>
  );
}

export default SuggestionItem;

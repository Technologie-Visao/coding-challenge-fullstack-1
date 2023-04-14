type SuggestionItemProps = {
  suggestion: Suggestion;
};

function SuggestionItem({ suggestion }: SuggestionItemProps) {
  return (
    <li>
      <h1>{suggestion.name}</h1>
      <p>{suggestion.description}</p>
      <img src={suggestion.thumbnail_url} />
    </li>
  );
}

export default SuggestionItem;

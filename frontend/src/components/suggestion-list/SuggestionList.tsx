import SuggestionItem from '../suggestion-item/SuggestionItem';
import styles from './styles.module.scss';

type SuggestionListProps = {
  suggestions: SearchedSuggestion[];
  onSelected?: (suggestion: SearchedSuggestion) => void;
};

function SuggestionList({ suggestions, onSelected }: SuggestionListProps) {
  return (
    <ul>
      {suggestions.map((suggestion) => (
        // Granite is used twice, so I use the thumbnail as the key
        <SuggestionItem
          key={suggestion.thumbnail_url}
          suggestion={suggestion}
          onSelected={onSelected}
        />
      ))}
    </ul>
  );
}

export default SuggestionList;

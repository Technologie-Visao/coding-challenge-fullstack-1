import SuggestionItem from '../suggestion-item/SuggestionItem';
import styles from './styles.module.scss';

type SuggestionListProps = {
  suggestions: Suggestion[];
};

function SuggestionList({ suggestions }: SuggestionListProps) {
  return (
    <ul className={styles.test}>
      {suggestions.map((suggestion) => (
        // Granite is used twice, so I use the thumbnail as the key
        <SuggestionItem
          key={suggestion.thumbnail_url}
          suggestion={suggestion}
        />
      ))}
    </ul>
  );
}

export default SuggestionList;

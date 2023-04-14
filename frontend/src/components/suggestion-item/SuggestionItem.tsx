import styles from './styles.module.scss';

type SuggestionItemProps = {
  suggestion: SearchedSuggestion;
  onSelected?: (suggestion: SearchedSuggestion) => void;
};

function SuggestionItem({ suggestion, onSelected }: SuggestionItemProps) {
  return (
    <li
      className={styles['suggestion-item']}
      onClick={() => onSelected?.(suggestion)}
    >
      <h1>{suggestion.name}</h1>
      <p>{suggestion.description}</p>
      <p>{suggestion.score}</p>
      {/* <img src={suggestion.thumbnail_url} /> */}
    </li>
  );
}

export default SuggestionItem;

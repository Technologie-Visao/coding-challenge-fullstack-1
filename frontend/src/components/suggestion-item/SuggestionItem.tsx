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
      <div className={styles.thumbnail}>
        <img src={suggestion.thumbnail_url} />
      </div>
      <div className={styles.details}>
        <h1>{suggestion.name}</h1>
        <p>{suggestion.description}</p>
        <p>{suggestion.score}</p>
      </div>
    </li>
  );
}

export default SuggestionItem;

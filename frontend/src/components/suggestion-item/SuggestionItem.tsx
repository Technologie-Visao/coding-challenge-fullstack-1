import styles from './styles.module.scss';

type SuggestionItemProps = {
  suggestion: SearchedSuggestion;
  selected?: boolean;
  /**
   * Triggered when item is clicked
   */
  onSelected?: (suggestion: SearchedSuggestion) => void;
};

/**
 * Suggestion list item
 */
function SuggestionItem({
  suggestion,
  onSelected,
  selected = false,
}: SuggestionItemProps) {
  return (
    <div
      className={`${styles['suggestion-item']} ${
        selected ? styles.selected : ''
      }`}
      onClick={() => onSelected?.(suggestion)}
    >
      {/* Thumbnail */}
      <div className={styles.thumbnail}>
        <img src={suggestion.thumbnail_url} />
      </div>
      {/* Details */}
      <div className={styles.details}>
        <h1>{suggestion.name}</h1>
        <p className={styles.description}>{suggestion.description}</p>
        {/* <p>{suggestion.score}</p> */}
      </div>
    </div>
  );
}

export default SuggestionItem;

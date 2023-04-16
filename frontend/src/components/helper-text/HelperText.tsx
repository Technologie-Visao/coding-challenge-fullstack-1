import styles from './styles.module.scss';
export const MIN_CHARACTERS = 2;

type HelperTextProps = {
  search: string;
  suggestions: Suggestion[];
};

/**
 * Helper text indicating whether the search length is bigger than the minimum number of characters
 * or whether no searches were found
 */
function HelperText({ search, suggestions }: HelperTextProps) {
  const isSearchLongEnough = search.length >= MIN_CHARACTERS;
  const noSuggestionsFound = suggestions.length === 0;

  function helperText() {
    if (search === '') {
      return '';
    } else if (search.length > 0 && !isSearchLongEnough) {
      return 'Keep typing...';
    } else if (noSuggestionsFound) {
      return 'No suggestions found';
    } else if (suggestions.length > 1) {
      return `Top ${suggestions.length} results`;
    } else {
      return '';
    }
  }

  return (
    <div className={styles.container}>
      <p>{helperText()}</p>
    </div>
  );
}

export default HelperText;

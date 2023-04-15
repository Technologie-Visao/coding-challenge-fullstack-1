const MIN_CHARACTERS = 2;

/**
 * Helper text indicating whether the search length is bigger than the minimum number of characters
 * or whether no searches were found
 */
function useHelperText(search: string, suggestions: Suggestion[]) {
  const isSearchLongEnough = search.length >= MIN_CHARACTERS;
  const noSuggestionsFound = suggestions.length === 0;

  let helperText = '';
  if (!isSearchLongEnough) {
    helperText = 'Keep typing...';
  } else if (noSuggestionsFound) {
    helperText = 'No suggestions found';
  }
  return { isSearchLongEnough, helperText };
}

export default useHelperText;

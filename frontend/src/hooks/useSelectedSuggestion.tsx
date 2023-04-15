import { useEffect, useState } from 'react';

/**
 * Selected suggestion
 */
function useSelectedSuggestion(search: string, suggestions: Suggestion[]) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const selectedSuggestion: Suggestion | undefined = suggestions[selectedIndex];

  // reset selectedIndex for each character typed
  useEffect(() => {
    setSelectedIndex(-1);
  }, [search]);

  /**
   * Increment index if not already the last item
   */
  function increment() {
    setSelectedIndex((selectedIndex) =>
      Math.min(selectedIndex + 1, suggestions.length - 1),
    );
  }

  /**
   * Decrement index if not already the first item
   */
  function decrement() {
    setSelectedIndex((selectedIndex) => Math.max(selectedIndex - 1, 0));
  }

  return { selectedSuggestion, increment, decrement };
}

export default useSelectedSuggestion;

import { useEffect, useRef } from 'react';
import SuggestionItem from '../suggestion-item/SuggestionItem';

type SuggestionListProps = {
  suggestions: SearchedSuggestion[];
  /**
   * Specify a selected suggestion of your choice
   */
  selectedSuggestion?: Suggestion;
  /**
   * Triggers when one of the list items is selected
   */
  onSelected?: (suggestion: SearchedSuggestion) => void;
};

/**
 * List of suggested textures
 */
function SuggestionList({
  suggestions,
  selectedSuggestion,
  onSelected,
}: SuggestionListProps) {
  const scrollToRef = useRef<HTMLDivElement>(null);

  // scroll selected suggestion into view
  useEffect(() => {
    scrollToRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, [selectedSuggestion]);

  return (
    <ul aria-label="suggestions">
      {suggestions.map((suggestion) => {
        const selected = suggestion === selectedSuggestion;
        return (
          // Granite is used twice, so I use the thumbnail as the key
          <li key={suggestion.thumbnail_url}>
            <SuggestionItem
              suggestion={suggestion}
              selected={selected}
              onSelected={onSelected}
            />
            {selected && <div ref={scrollToRef}></div>}
          </li>
        );
      })}
    </ul>
  );
}

export default SuggestionList;

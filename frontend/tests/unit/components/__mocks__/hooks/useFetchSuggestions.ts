import { mockSuggestions } from '../constants/AutocompleteMockSuggestions';
import {Texture} from "../../../../../src/types/textures/Texture";
import {FetchSuggestionsRequest} from "../../../../../src/types/hooks/textures/FetchSuggestionsRequest";

const useFetchSuggestions = ({ searchTerm, shouldFetch }: FetchSuggestionsRequest) => {
  let data: Texture[] = [];
  let loading = false;
  let error: Error | null = null;

  if (shouldFetch) {
    loading = true;
    data = mockSuggestions.filter((suggestion) =>
      suggestion.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    loading = false;
  }

  return { data, error, loading };
};

export default useFetchSuggestions;

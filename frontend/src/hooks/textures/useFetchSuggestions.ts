import useFetch from "../useFetch";
import {GlobalHookResponse} from "../../types/hooks/GlobalHookResponse";
import {fetchSuggestionsRequest} from "../../types/hooks/textures/FetchSuggestionsRequest";
import API_URL from "../../utils/getApiUrl";


const useFetchSuggestions = ({searchTerm, shouldFetch, limit = 5}: fetchSuggestionsRequest): GlobalHookResponse => {
  const url = shouldFetch ? `${API_URL}/textures/suggestions?search_term=${searchTerm}&limit=${limit}` : null;
  const {data, error, loading} = useFetch(url);
  return {data, error, loading};
};

export default useFetchSuggestions;

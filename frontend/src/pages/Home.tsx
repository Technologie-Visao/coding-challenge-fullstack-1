import Loading from '~/components/loading/Loading';
import SearchBar from '~/components/search-bar/SearchBar';
import SuggestionList from '~/components/suggestion-list/SuggestionList';
import { useSuggestionsQuery } from '~/redux/services/suggestionsApi';

function Home() {
  const { data } = useSuggestionsQuery();

  if (!data) return <Loading />;

  return (
    <>
      <SearchBar />
    </>
  );
}

export default Home;

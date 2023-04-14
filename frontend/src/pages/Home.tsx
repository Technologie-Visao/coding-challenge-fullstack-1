import Loading from '~/components/loading/Loading';
import SuggestionList from '~/components/suggestion-list/SuggestionList';
import { useSuggestionsQuery } from '~/redux/services/suggestionsApi';

function Home() {
  const { data } = useSuggestionsQuery();

  if (!data) return <Loading />;

  return <SuggestionList suggestions={data} />;
}

export default Home;

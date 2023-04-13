import './App.css';
import { useSuggestionsQuery } from './redux/services/suggestionsApi';

function App() {
  const { data } = useSuggestionsQuery();
  console.log('TEST', data);
  return <div>{data?.toString()}</div>;
}

export default App;

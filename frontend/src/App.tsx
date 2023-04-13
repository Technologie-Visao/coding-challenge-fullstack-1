import './App.css';
import { useSuggestionsQuery } from './redux/services/suggestionsApi';

function App() {
  useSuggestionsQuery();
  return <div>App 2</div>;
}

export default App;

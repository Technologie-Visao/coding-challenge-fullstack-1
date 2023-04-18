import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AutocompleteComponent from './pages/SearchPage';
function App() {
  return (
    <>
    
    <Router>
      <Routes>
        <Route path="/" element={<AutocompleteComponent />} />
      
        

      </Routes>
    </Router>
  
    </>
  


  )
}


export default App

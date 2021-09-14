import { BrowserRouter as Router, Route } from "react-router-dom";
import SearchBar from "./components/searchBar";
import SongPage from './components/songPage';
import "./index.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path='/' exact component={SearchBar} />
        <Route path='/SongPage' exact component={SongPage} />
      </Router>
    </div>
  );
}

export default App;

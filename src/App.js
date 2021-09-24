import { BrowserRouter as Router, Route } from "react-router-dom";
import SearchBar from "./components/searchBar";
import SongPage from "./components/songPage";
import DisplayAllSongs from "./components/displayAllSongs";
import "./index.css";
import Navbar from "./components/navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Route path="/" exact component={SearchBar} />
        <Route path="/SongPage" exact component={SongPage} />
        <Route path="/DisplayAllSongs" exact component={DisplayAllSongs} />
      </Router>
    </div>
  );
}

export default App;

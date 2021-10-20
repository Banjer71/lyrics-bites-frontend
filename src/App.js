import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar";
import SearchBar from "./components/searchBar";
import SongPage from "./components/songPage";
import DisplayAllSongs from "./components/displayAllSongs";
import ShowLyrics from "./components/showLyrics";
import "./index.css";


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
        <Route path="/" exact component={SearchBar} />
        <Route path="/songPage" exact component={SongPage} />
        <Route path="/displayAllSongs" exact component={DisplayAllSongs} />
        <Route path="/showLyrics/:_id" children={<ShowLyrics />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

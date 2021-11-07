import { Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar";
import SearchBar from "./components/searchBar";
import SongPage from "./components/songPage";
import DisplayAllSongs from "./components/displayAllSongs";
import ShowLyrics from "./components/showLyrics";
import ToastMessageProvider from "./components/context/toastMessage";
import "./index.css";

function App() {
  return (
    <div className="App">
      <ToastMessageProvider>
        <Navbar />
        <Switch>
          <Route path="/" exact component={SearchBar} />
          <Route path="/songPage" exact component={SongPage} />
          <Route path="/displayAllSongs" exact component={DisplayAllSongs} />
          <Route
            path="/showLyrics/:_id"
            children={(props) => <ShowLyrics {...props} />}
          />
        </Switch>
      </ToastMessageProvider>
    </div>
  );
}

export default App;

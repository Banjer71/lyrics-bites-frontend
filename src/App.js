import React from "react";
import { Route, Switch } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import Navbar from "./components/navbar";
import SearchBar from "./components/searchBar";
import SongPage from "./components/songPage";
import DisplayAllSongs from "./components/displayAllSongs";
import ShowLyrics from "./components/showLyrics";
import ToastMessageProvider from "./components/context/toastMessage";
import "./index.css";
import SignUp from "./components/signup/signup";
import Login from "./components/login/Login";

function App() {
  return (
    <AuthProvider>
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
            <Route path="/signup" exact component={SignUp} />
            <Route path="/login" exact component={Login} />
          </Switch>
        </ToastMessageProvider>
      </div>
    </AuthProvider>
  );
}

export default App;

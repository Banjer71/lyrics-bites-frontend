import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import SearchBar from "./components/searchBar";

function App() {
  return (
    <div className="App">
      <Router>
        <SearchBar />
      </Router>
    </div>
  );
}

export default App;

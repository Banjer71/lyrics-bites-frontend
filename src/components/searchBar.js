import React, { useState } from "react";
import ArtistCard from "./artistCard";
import Header from "./header";
import Loader from "./loader";
import "../css/searchbar.css";

const SearchBar = () => {
  const [selectParam, setSelectParam] = useState("q_artist");
  const [paramToSearch, setParamToSerach] = useState("");
  const [tune, setTune] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const getData = async () => {
      const fetchData = await fetch(`/api/search/${selectParam}/${paramToSearch}`);
      const data = await fetchData.json();
      console.log('from the client: ', data)
      setTune(data);
      setIsLoading(false);
      setParamToSerach("");
    };
    getData();
  };

  const handleChange = (e) => {
    setParamToSerach(e.target.value);
  };

  const getSelectionQuery = (e) => {
    const newValue = e.target.value;
    if (newValue === "q_lyrics") {
      setSelectParam(newValue);
    } else if (newValue === "q_track") {
      setSelectParam(newValue);
    } else {
      setSelectParam(newValue);
    }
  };

  return (
    <div className="search-bar">
      <Header />
      <div className="field">
        <form className="form-u" onSubmit={handleSubmit}>
          <label>Search a Song</label>
          <select value={selectParam} onChange={getSelectionQuery}>
            <option value="q_artist">By Artist</option>
            <option value="q_track">By Song</option>
            <option value="q_lyrics">By Word</option>
          </select>
          <input
            type="text"
            name="paramToSearch"
            autoComplete="on"
            placeholder="search..."
            value={paramToSearch}
            onChange={handleChange}
          />
          <button type="submit">Get Songs</button>
        </form>
      </div>
      <div className="grid track">
        {isLoading ? (
          <Loader />
        ) : (
          tune &&
          tune.map((song) => {
            return (
              <ArtistCard
                key={song.track.track_id}
                track={song.track}
                album={song.album_name}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default SearchBar;

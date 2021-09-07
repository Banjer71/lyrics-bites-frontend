import React, { useState } from "react";
import ArtistCard from "./artistCard";
import Loader from "./loader";

const SearchBar = () => {
  const [selectParam, setSelectParam] = useState("q_artist");
  const [paramToSearch, setParamToSerach] = useState("");
  const [tune, setTune] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const musicMatch = process.env.REACT_APP_API_KEY_MUSICMATCH;
    const restUrl = `track.search?${selectParam}=${paramToSearch}&page_size=4&page=1&f_has_lyrics=1&s_track_rating=desc&apikey=${musicMatch}`;
    setIsLoading(true);

    fetch(`/ws/1.1/${restUrl}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const info = data.message.body.track_list;
        console.log(info);
        setTune(info);
        setIsLoading(false);
      });
    setParamToSerach(e.target.reset());
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
    <div>
      <h1>Lyrics Bites</h1>
      <h3>Learn your favourite song one bite at a time</h3>

      <form onSubmit={handleSubmit}>
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

      <div>
        {isLoading ? (
          <Loader />
        ) : (
          tune &&
          tune.map((song) => {
            return <ArtistCard key={song.track.track_id} track={song.track} />;
          })
        )}
      </div>
    </div>
  );
};

export default SearchBar;

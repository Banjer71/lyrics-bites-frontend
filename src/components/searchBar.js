import React, { useState } from "react";

const SearchBar = () => {
  const [paramToSearch, setParamToSerach] = useState();
  const [tune, setTune] = useState();
  const [selectParam, setSelectParam] = useState("q_artist");
  const [isLoading, setIsLoading] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const url = `http://localhost:3001/api/:${artist}`;
  //   setIsloading(true);
  //   const res = await fetch(url, {
  //     method: "GET",
  //     headers: { "Content-type": "application/json" },
  //   });
  //   const data = await res.json();
  //   let song = data.map((item) => item.track);
  //   setTune(song);
  //   setIsloading(false);
  //   setArtist(e.target.reset());
  // };

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
      <form onSubmit={handleSubmit}>
        <h1>Lyrics Bites</h1>
        <h3>Learn your favourite song one bite at a time</h3>
        <div className="field">
          <label>Search a Song</label>
          <select value={selectParam} onChange={getSelectionQuery}>
            <option value="q_artist">By Artist</option>
            <option value="q_track">By Song</option>
            <option value="q_lyrics">By Word</option>
          </select>
          <label className="label">Artist</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Type artist name here"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button type="submit">Get Songs</button>
          </div>
        </div>
      </form>
      <div>
        {isLoading ? (
          <p>is loading</p>
        ) : (
          tune &&
          tune.map((song) => {
            return <p key={song.track.track_id}>{song.track.track_name}</p>;
          })
        )}
      </div>
    </div>
  );
};

export default SearchBar;

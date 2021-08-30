import React, { useState } from "react";

const SearchBar = () => {
  const [artist, setArtist] = useState("");
  const [tune, setTune] = useState();
  const [isLoading, setIsloading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "http://localhost:3001";
    const location = {
      artist,
    };
    setIsloading(true);
    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(location),
    }).then((res) =>
      res.json().then((data) => {
        let song = data.map((item) => item.track);
        setTune(song);
        setIsloading(false);
        setArtist(e.target.reset());
      })
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Lyrics Bites</h1>
        <h3>Learn your favourite song one bite at a time</h3>
        <div className="field">
          <label className="label">Artist</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Type artist name here"
              onChange={(e) => setArtist(e.target.value)}
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
            return <p key={song.track_id}>{song.track_name}</p>;
          })
        )}
      </div>
    </div>
  );
};

export default SearchBar;

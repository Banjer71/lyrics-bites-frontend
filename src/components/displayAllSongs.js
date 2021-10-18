import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DisplayAllSongs = () => {
  const [displayAll, setDisplayAll] = useState();

  useEffect(() => {
    fetch("/v.1/api/all")
      .then((res) => res.json())
      .then((data) => {
        setDisplayAll(data);
      });
  }, []);

  const deleteAllSongs = () => {
    fetch("/v.1/api/all", {
      method: "DELETE",
    }).then((res) => res.json());
    setDisplayAll([]);
  };

  return (
    <div>
      <h1>Your Song Collection</h1>
      <div>
        {displayAll && displayAll.length !== 0 ? (
          displayAll.map((song) => {
            return (
              <pre key={song._id}>
                <h2>
                  <Link
                    to={{
                      pathname: "/ShowLyrics",
                      state: {
                        lyrics: song.words,
                        id: song._id,
                        songTitle: song.songTitle,
                      },
                    }}
                  >
                    {song.artistName} - {song.songTitle}
                  </Link>
                </h2>
              </pre>
            );
          })
        ) : (
          <p style={{ textAlign: "center" }}>Your songs list is empty</p>
        )}
        <button onClick={deleteAllSongs}>Delete all songs</button>
      </div>
    </div>
  );
};

export default DisplayAllSongs;

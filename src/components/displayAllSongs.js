import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DisplayAllSongs = () => {
  const [displayAll, setDisplayAll] = useState();

  useEffect(() => {
    fetch("/all")
      .then((res) => res.json())
      .then((data) => {
        setDisplayAll(data);
      });
  }, []);

  const deleteAllSongs = () => {
    fetch("/all", {
      method: "DELETE",
    }).then((res) => res.json());
    setDisplayAll([]);
  };

  return (
    <div>
      <h1>Your Song Collection</h1>
      <div>
    
        {displayAll && displayAll.length !== 0 ? (
        {displayAll &&

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
                        songName: song.songName,
                      },
                    }}
                  >
                    {song.artistName} - {song.songName}
                  </Link>
                </h2>
              </pre>
            );
          })
        ) : (
          <p style={{ textAlign: "center" }}>Your songs list is empty</p>
        )}
        <button onClick={deleteAllSongs}>Delete all songs</button>

                  <Link to={{
                    pathname: '/ShowLyrics',
                     state: {
                     lyrics: song.words,
                     id:song._id
                   }
                  }}>{song.artistName} - {song.songName}</Link>
                </h2>
              </pre>
            );
          })}

      </div>
    </div>
  );
};

export default DisplayAllSongs;

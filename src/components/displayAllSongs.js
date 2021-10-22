import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CheckBox from "./checkBox";

const DisplayAllSongs = (props) => {
  const [displayAll, setDisplayAll] = useState();
  const [ids, setIds] = useState([]);

  useEffect(() => {
    fetch("/v.1/api/all")
      .then((res) => res.json())
      .then((data) => {
        console.log("from the list all songs: ", data);
        setDisplayAll(data);
      });
  }, []);

  const deleteAllSongs = () => {
    fetch("/v.1/api/all", {
      method: "DELETE",
    }).then((res) => res.json());
    setDisplayAll([]);
  };

  const selectSong = (e) => {
    const selectedId = e.target.value;
    if (ids.includes(selectedId)) {
      const newIds = ids.filter((id) => id !== selectedId);
      console.log(newIds);
      setIds(newIds);
    } else {
      const newIds = [...ids, selectedId];
      // newIds.push(selectedId);
      console.log("to be deleted: ", newIds);
      setIds(newIds);
    }
  };

  const removeSongsById = () => {
    const remainingSong = displayAll.filter((song) => !ids.includes(song._id));
    console.log(ids);
    fetch(`/v.1/api/delete/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDisplayAll(remainingSong);
      });
  };

  return (
    <div className="display-all-songs-wrapper">
      <h1>Your Song Collection</h1>
      <div className="display-all-songs">
        {displayAll && displayAll.length !== 0 ? (
          displayAll.map((song) => {
            return (
              <div className="song" key={song._id}>
                <h2>
                  <Link
                    to={{
                      pathname: `/showLyrics/${song._id}`,
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
                <label>
                  <CheckBox
                    value={song._id}
                    onChange={selectSong}
                    checked={ids.includes(song._id) ? true : false}
                  />
                  delete
                </label>
              </div>
            );
          })
        ) : (
          <p style={{ textAlign: "center" }}>Your songs list is empty</p>
        )}
        <button type="button" onClick={removeSongsById}>
          Delete Selected Product(s)
        </button>
        <button onClick={deleteAllSongs}>Delete all songs</button>
      </div>
    </div>
  );
};

export default DisplayAllSongs;


import React from "react";
import { Link } from "react-router-dom";

const ShowLyrics = (props) => {
  const { id, songName, lyrics } = props.location.state;

  const deleteSong = async () => {
    await fetch(`/api/song/${props.location.state.id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  };

  return (
    <div>
      <h1>Lyrics</h1>
      <h2 style={{ color: "red", textAlign: "center", paddingBottom: "1rem" }}>
        {songName}
      </h2>
      <pre key={id}>{lyrics}</pre>
      <Link to="/DisplayAllSongs">
        <button onClick={deleteSong}>Delete this song</button>
      </Link>
    </div>
  );
};


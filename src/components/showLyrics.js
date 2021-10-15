import React from "react";
import { Link } from "react-router-dom";

const ShowLyrics = (props) => {
  const { id, songTitle, lyrics } = props.location.state;

  const deleteSong = async () => {
    await fetch(`https://lyrics-bites.herokuapp.com/api/song/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  };

  const sendLyrics = () => {
    try {
      fetch(`https://lyrics-bites.herokuapp.com/api/send_email/${lyrics}`)
        .then((res) => res.json())
        .then((data) => console.log(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Lyrics</h1>
      <h2 style={{ color: "red", textAlign: "center", paddingBottom: "1rem" }}>
        {songTitle}
      </h2>
      <pre key={id}>{lyrics}</pre>
      <button onClick={sendLyrics}>Send song via email</button>
      <Link to="/DisplayAllSongs">
        <button onClick={deleteSong}>Delete this song</button>
      </Link>
    </div>
  );
};

export default ShowLyrics;

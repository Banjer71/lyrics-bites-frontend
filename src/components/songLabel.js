import React from "react";
import { Link } from "react-router-dom";
import "../css/songlabel.css";

const SongLabel = ({ song, children, displayAll }) => {
  console.log("displayAll: ", displayAll);
  return (
    <div className="song">
      <p className="song-name">{song.artistName}</p>
      <p>
        <Link
          to={{
            pathname: `/showLyrics/${song._id}`,
            search: `?title=${song.songTitle}`,
            state: {
              lyrics: song.words,
              id: song._id,
              songTitle: song.songTitle,
              displayAll,
            },
          }}
        >
          <>{song.songTitle}</>
          {children}
        </Link>
      </p>
    </div>
  );
};

export default SongLabel;

import React, { useEffect, useState } from "react";

const DisplayAllSongs = () => {
  const [displayAll, setDisplayAll] = useState();

  useEffect(() => {
    fetch("/all")
      .then((res) => res.json())
      .then((data) => {
        setDisplayAll(data);
      });
  }, []);

  return (
    <div>
      <h1>Your Song Collection</h1>
      <div>
        {displayAll &&
          displayAll.map((song) => {
            return <pre key={song._id}>{song.lyric}</pre>;
          })}
      </div>
    </div>
  );
};

export default DisplayAllSongs;

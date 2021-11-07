import React from "react";

const SideBar = ({ cover, artist, albumTitle, albumId, getAlbumTracks }) => {
  return (
    <div className="cover-art">
      <img src={cover} alt="album cover" />
      <p className="cover-art-info">{artist}</p>
      <p className="cover-art-info">{albumTitle}</p>
      <ul className="record-tracks">
        {albumId &&
          albumId.map((song) => {
            return (
              <li
                key={song.track.track_id}
                onClick={() =>
                  getAlbumTracks(
                    song.track.track_id,
                    song.track.album_id,
                    song.track
                  )
                }
              >
                <a href="#top">{song.track.track_name}</a>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default SideBar;

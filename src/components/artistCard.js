import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import defImg from "../imageDef.png";
import "../css/artistcard.css";

const ArtistCard = ({ track }) => {
  const [cover, setCover] = useState("");

  useEffect(() => {
    let apy_key_lastfm = process.env.REACT_APP_API_KEY_LASTFM;
    let albumName = track.album_name;
    let name = albumName.replace(/ /gi, "%20");

    const lastfm2 = `/?method=album.search&album=${name}&api_key=${apy_key_lastfm}&format=json`;

    const fetchCover = async () => {
      const response = await fetch(`/api/cover/2.0${lastfm2}`);
      const covers = await response.json();
      const albumCover = covers.results.albummatches.album[0].image[3]["#text"];
      setCover(albumCover);
    };
    fetchCover().catch((err) => console.log(err));
  }, [track.album_name]);

  return (
    <div className="card">
      {cover ? <img src={cover} alt="pic" /> : <img src={defImg} alt="pic" />}
      <Link
        className="card-link"
        to={{
          pathname: "/SongPage",
          state: {
            album_id: track.album_id,
            album: track.album_name,
            trackId: track.track_id,
            artistId: track.artist_id,
            artistName: track.artist_name,
            songTitle: track.track_name,
          },
        }}
      >
        <p>{track.artist_name}</p>
        <p>{track.album_name}</p>
        <p>{track.track_name}</p>
      </Link>
    </div>
  );
};

export default ArtistCard;

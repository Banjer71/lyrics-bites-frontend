import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import defImage from "../imageDef.png";
import "../css/songpage.css";

const SongPage = (props) => {
  const [lyric, setLyric] = useState("");
  const [copyRight, setCopyright] = useState("null");
  const [artist, setArtist] = useState("");
  const [cover, setCover] = useState("");
  const [albumTitle, setAlbumTitle] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [albumId, setAlbumId] = useState("");
  const [updateState, setUpdateState] = useState(props.location.state);

  useEffect(() => {
    const abortControlledApi = new AbortController();
    const signal = abortControlledApi.signal;
    const trackId =
      props.location && props.location.state
        ? props.location.state.trackId
        : "";
    const songTrack =
      props.location && props.location.state
        ? props.location.state.songName
        : "";
    const idAlbum =
      props.location && props.location.state
        ? props.location.state.album_id
        : "";

    if (!trackId && !songTrack && idAlbum) {
      return;
    }
      const album =
      props.location && props.location.state ? props.location.state.album : "";

    if (!album) {
      return;
    }

    Promise.all([
      fetch(`/ws/1.1/track.lyrics.get?track_id=${trackId}&apikey=${process.env.REACT_APP_API_KEY_MUSICMATCH}`),
      fetch(`/ws/1.1/track.search?q_track=${songTrack}&apikey=${process.env.REACT_APP_API_KEY_MUSICMATCH}`),
      fetch(`/ws/1.1/album.tracks.get?album_id=${idAlbum}&apikey=${process.env.REACT_APP_API_KEY_MUSICMATCH}`),
      fetch(`/2.0/?method=album.search&album=${album}&api_key=${process.env.REACT_APP_API_KEY_LASTFM}&format=json`, { signal })
    ])
    .then(res => Promise.all(res.map(res => res.json())))
    .then(data => {
      const lyrics = data[0].message.body.lyrics;
      const songTitle = data[1].message.body.track_list;
      const albumTracksList = data[2].message.body.track_list;
      const coverAlbum = data[3].results.albummatches.album[0];
        if (typeof lyrics !== "undefined") {
          setLyric(lyrics.lyrics_body);
          setCopyright(lyrics.lyrics_copyright);
        } else {
          return;
        }
      setSongTitle(songTitle[0].track.track_name);
      setAlbumId(albumTracksList);
            if (typeof coverAlbum !== "undefined") {
          setCover(coverAlbum.image[3]["#text"]);
          setArtist(coverAlbum.artist);
          setAlbumTitle(coverAlbum.name);
        } else {
          setCover(defImage);
        }
    })
    .catch(err => console.log(err));

      return function cleanUp() {
      abortControlledApi.abort();
    };
    
  }, [props.location]);

  const getAlbumTracks = (idTrack, idAlbum, ...props) => {
    let prevData = props.map((item) => {
      return {
        album_id: item.album_id,
        album_name: item.album_name,
        artistName: item.artist_name,
        artistId: item.artist_id,
        songTitle: item.track_name,
        trackId: item.track_id,
      };
    });
    setUpdateState(...prevData);

    Promise.all([
      fetch( `/ws/1.1/track.lyrics.get?track_id=${idTrack}&apikey=${process.env.REACT_APP_API_KEY_MUSICMATCH}`),
      fetch(`/ws/1.1/album.tracks.get?album_id=${idAlbum}&apikey=${process.env.REACT_APP_API_KEY_MUSICMATCH}`)
    ])
    .then(res => Promise.all(res.map(res => res.json())))
    .then(data => {
      console.log(data)
      const lyric = data[0].message.body.lyrics;
      
      console.log(lyric)
      setLyric(lyric.lyrics_body);
     
      const songName = data[1].message.body.track_list;
      setSongTitle(
                  songName &&
                    songName.map((item) => {
                      return idTrack === item.track.track_id
                        ? item.track.track_name
                        : null;
                    })
                );
    })
    .catch(error => console.log(error))
  };

  const sendSongViaEmail = async () => {
    const dataToSave = {
      ...updateState,
      words: lyric,
    };
    await fetch(`/api/song`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSave),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="song-box" id="top">
      <div className="song-title-card">
        <div className="song-text">
          <h1 className="song-title">{songTitle}</h1>
          <pre className="lyrics">
            {lyric !== ""
              ? lyric
              : copyRight === ""
              ? "no lyrics on the database"
              : copyRight}
          </pre>
          {/* <Link to="/DisplayAllSongs"> */}
          <button onClick={sendSongViaEmail} className="btn-get-song">
            Save this song
          </button>
          {/* </Link> */}

          <Link to="/">
            <button>Back to the HomePage</button>
          </Link>
        </div>
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
      </div>
    </div>
  );
};

export default SongPage;

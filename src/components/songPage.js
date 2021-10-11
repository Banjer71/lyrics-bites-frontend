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
    //verifying if the  props.state location exsist

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

    
    // the trackId variable contain the value from the form 
    
    fetch(`/api/words/${trackId}`)
      .then((response) => response.json())
      .then((words) => {
        console.log('words from client: ', words)
        // const words = data.message.body.lyrics;
        if (typeof words !== "undefined") {
          setLyric(words.lyrics_body);
          setCopyright(words.lyrics_copyright);
        } else {
          return;
        }

        //con questa cerco il titolo
        return fetch(`/api/songtracks/${songTrack}`)
          .then((res) => res.json())
          .then((data) => {
            console.log('song track dal client: ', data)
            // const songName = data.message.body.track_list;
            setSongTitle(data);

            // con questa invece cerco l'id dell'album
            return fetch(`/api/album/${idAlbum}`)
              .then((res) => res.json())
              .then((albumListSong) => {
             

                setAlbumId(albumListSong);
              });
          });
      });
  }, [props.location]);

  // qui grazie allo state album mi cerco la copertina e
  //i dati dell'artista che richiedo all'api di lastfm
  useEffect(() => {
    const abortControlledApi = new AbortController();
    const signal = abortControlledApi.signal;
    const album =
      props.location && props.location.state ? props.location.state.album : "";

    if (!album) {
      return;
    }

    fetch(
      `/api/coverAlbum/${album}`,
      { signal }
    )
      .then((res) => res.json())
      .then((data) => {
        // const albumInfo = data.results.albummatches.album[0];
        if (typeof data !== "undefined") {
          setCover(data.image[3]["#text"]);
          setArtist(data.artist);
          setAlbumTitle(data.name);
        } else {
          setCover(defImage);
        }
      });

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
        songName: item.track_name,
        trackId: item.track_id,
      };
    });
    setUpdateState(...prevData);

    fetch(
      `/api/trackLyrics/${idTrack}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("richiesta altre song: ", data);
        const lyric = data.lyrics_body;
        setLyric(lyric);

        return fetch(
          `/api/albumTracksGet/${idAlbum}`
        )
          .then((res) => res.json())
          .then((songName) => {
            // const songName = data.message.body.track_list;
            setSongTitle(
              songName &&
                songName.map((item) => {
                  return idTrack === item.track.track_id
                    ? item.track.track_name
                    : null;
                })
            );
          });
      });
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

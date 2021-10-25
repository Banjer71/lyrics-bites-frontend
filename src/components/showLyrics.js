import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Modal from "./modal";

const ShowLyrics = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [emailStatus, setEmailStatus] = useState();
  const [lyrics, setLyrics] = useState();
  const [artist, setArtist] = useState();
  const [songTitle, setSongTitle] = useState();

  const { _id } = useParams();
  let history = useHistory();

  let data = Object.values(history.location.state);

  useEffect(() => {
    fetch(`/v.1/api/song/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setLyrics(data.words);
        setArtist(data.artistName);
        setSongTitle(data.songTitle);
      });
  }, [_id]);

  const deleteSong = () => {
    const car = data[3].filter((item) => item._id !== _id);
    history.push("/displayAllSongs", car);
    fetch(`/v.1/api/song/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("dal server", data);
      })
      .catch((e) => console.log(e));
  };

  async function sendLyrics() {
    const mailToSEnd = {
      songTitle,
      lyrics,
      artist,
    };
    try {
      await fetch(`/v.1/api/send_email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mailToSEnd),
      })
        .then((res) => res.json())
        .then(async (data) => {
          console.log(data);
          setIsOpen(true);
          setEmailStatus(data.status);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div style={{ position: "relative" }}>
        <h1>Lyrics</h1>
        <h2
          style={{ color: "red", textAlign: "center", paddingBottom: "1rem" }}
        >
          {songTitle}
        </h2>
        <h3>by {artist}</h3>
        <pre key={_id}>{lyrics}</pre>
        <button onClick={sendLyrics}>Send song via email</button>
        <button onClick={deleteSong}>Delete this song</button>
      </div>
      <Modal open={isOpen} OnClose={() => setIsOpen(false)}>
        {emailStatus}
      </Modal>
    </>
  );
};

export default ShowLyrics;

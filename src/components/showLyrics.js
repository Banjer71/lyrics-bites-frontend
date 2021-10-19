import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./modal";

const ShowLyrics = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [emailStatus, setEmailStatus] = useState();
  const { id, songTitle, lyrics } = props.location.state;

  const deleteSong = async () => {
    await fetch(`/v.1/api/song/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  };

  const sendLyrics = async () => {
    const mailToSEnd = {
      songTitle,
      lyrics,
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
        })
        .catch((err) => console.log(err));
    } catch (error) {}
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <h1>Lyrics</h1>
        <h2
          style={{ color: "red", textAlign: "center", paddingBottom: "1rem" }}
        >
          {songTitle}
        </h2>
        <pre key={id}>{lyrics}</pre>
        <button onClick={sendLyrics}>Send song via email</button>
        <Link to="/DisplayAllSongs">
          <button onClick={deleteSong}>Delete this song</button>
        </Link>
      </div>
      <Modal open={isOpen} OnClose={() => setIsOpen(false)}>
        {emailStatus}
      </Modal>
    </>
  );
};

export default ShowLyrics;

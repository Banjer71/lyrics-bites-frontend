import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import defImage from '../imageDef.png';
import '../css/songpage.css';

const SongPage = (props) => {
	const [ lyric, setLyrics ] = useState('');
	const [ copyRight, setCopyright ] = useState(null);
	const [ artist, setArtist ] = useState('');
	const [ cover, setCover ] = useState('');
	const [ albumTitle, setAlbumTitle ] = useState('');
	const [ songTitle, setSongTitle ] = useState('');
	const [ albumId, setAlbumId ] = useState('');

	useEffect(
		() => {
			const trackId = props.location && props.location.state ? props.location.state.trackId : '';
			const songTrack = props.location && props.location.state ? props.location.state.songName : '';
			const idAlbum = props.location && props.location.state ? props.location.state.albumId : '';

			if (!trackId && !songTrack && idAlbum) {
				return;
			}

			fetch(`https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${trackId}&apikey=${process.env.REACT_APP_API_KEY_MUSICMATCH}`)
				.then((response) => response.json())
				.then((data) => {
					const words = data.message.body.lyrics;
					if (typeof words !== 'undefined') {
						setLyrics(words.lyrics_body);
						setCopyright(words.lyrics_copyright);
					} else {
						return;
					}

					return fetch(
						`https://api.musixmatch.com/ws/1.1/track.search?q_track=${songTrack}&apikey=${process.env.REACT_APP_API_KEY_MUSICMATCH}`
					)
						.then((res) => res.json())
						.then((data) => {
							const songName = data.message.body.track_list;
							setSongTitle(songName[0].track.track_name);

							return fetch(
								`https://api.musixmatch.com/ws/1.1/album.tracks.get?album_id=${idAlbum}&apikey=${process.env.REACT_APP_API_KEY_MUSICMATCH}`
							)
								.then((res) => res.json())
								.then((data) => {
									const albumListSong = data.message.body.track_list;
									setAlbumId(albumListSong);
								});
						});
				});
		},
		[ props.location ]
	);

	useEffect(
		() => {
			const abortControlledApi = new AbortController();
			const signal = abortControlledApi.signal;
			const album = props.location && props.location.state ? props.location.state.album : '';

			if (!album) {
				return;
			}

			fetch(
				`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${album}&api_key=${process.env.REACT_APP_API_KEY_LASTFM}&format=json`,
				{ signal }
			)
				.then((res) => res.json())
				.then((data) => {
					const albumInfo = data.results.albummatches.album[0];
					if (typeof albumInfo !== 'undefined') {
						setCover(albumInfo.image[3]['#text']);
						setArtist(albumInfo.artist);
						setAlbumTitle(albumInfo.name);
					} else {
						setCover(defImage);
					}
				});

			return function cleanUp() {
				abortControlledApi.abort();
			};
		},
		[ props.location ]
	);

	const getAlbumTracks = (idTrack, idAlbum) => {
		fetch(`https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${idTrack}&apikey=${process.env.REACT_APP_API_KEY_MUSICMATCH}`)
			.then((res) => res.json())
			.then((data) => {
				const lyric = data.message.body.lyrics;
				console.log(lyric)
				setLyrics(lyric.lyrics_body);

				return fetch(
					`https://api.musixmatch.com/ws/1.1/album.tracks.get?album_id=${idAlbum}&apikey=${process.env.REACT_APP_API_KEY_MUSICMATCH}`
				)
					.then((res) => res.json())
					.then((data) => {
						const songName = data.message.body.track_list;
						setSongTitle(
							songName &&
								songName.map((item) => {
									return idTrack === item.track.track_id ? item.track.track_name : null;
								})
						);
					});
			});
	};

	return (
		<div className="song-box" id='top'>
			<div className="song-title-card">
				<div className="song-text">
					<h1 className="song-title">{songTitle}</h1>
					<pre className="lyrics">
						{lyric !== '' ? lyric : copyRight === '' ? 'no lyrics on the database' : copyRight}
					</pre>

					<button className="btn-get-song">Get your song via Email</button>

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
										onClick={() => getAlbumTracks(song.track.track_id, song.track.album_id)}
									>
										<a href='#top'>{song.track.track_name}</a>
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
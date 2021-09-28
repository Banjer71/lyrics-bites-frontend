import React from 'react'

const ShowLyrics = (props) => {
    console.log(props)
    return (
        <div>
            <h1>Lyrics</h1>
            <pre key={props.location.state.id}>{props.location.state.lyrics}</pre>
        </div>
    )
}

export default ShowLyrics

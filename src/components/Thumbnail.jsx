import React, { useState, useEffect } from 'react';
import usePlaySong from '../hooks/usePlaySong'

const Thumbnail = () => {
    const { playSong } = usePlaySong()

    const handleClick = () => {
        playSong({
            name: 'Hey Mama',
            artist: 'Manish Das'
          })
    }

    return (
        <div>
            <h1 onClick={handleClick}>Test Page</h1>
        </div>
    );
};

export default Thumbnail;
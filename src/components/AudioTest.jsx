
// const response = await axios.get(`https://wavv-server.vercel.app/youtube/nfs8NYg7yQM`, { responseType: 'blob' });

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faVolumeMute, faVolumeUp, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from '@chakra-ui/react';

const AudioPlayer = ({ videoId, musicMetaData }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [audioUrl, setAudioUrl] = useState('');

    useEffect(() => {
        console.log('Fetching audio URL...');
        const fetchAudioUrl = async () => {
            try {
                const response = await axios.get(`https://wavv-server.vercel.app/youtube/${videoId}`, { responseType: 'blob' });
                const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
                const audioUrl = URL.createObjectURL(audioBlob);
                setAudioUrl(audioUrl);
                setIsLoading(false);
                console.log('Audio URL fetched successfully');
            } catch (error) {
                console.error('Error fetching audio:', error);
            }
        };

        fetchAudioUrl();
    }, [videoId]);

    const handlePlayPause = () => {
        const audio = document.getElementById('audio-element');
        if (isPlaying) {
            audio.pause();
            console.log('Audio paused');
        } else {
            audio.play();
            console.log('Audio playing');
        }
        setIsPlaying(!isPlaying);
    };

    const handleMute = () => {
        const audio = document.getElementById('audio-element');
        audio.muted = !isMuted;
        setIsMuted(!isMuted);
        console.log(isMuted ? 'Audio unmuted' : 'Audio muted');
    };

    const handleReset = () => {
        const audio = document.getElementById('audio-element');
        audio.currentTime = 0;
        setCurrentTime(0);
        setIsPlaying(false);
        audio.pause();
        console.log('Audio reset');
    };

    const handleTimeUpdate = () => {
        const audio = document.getElementById('audio-element');
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration);
    };

    const handleSeek = (e) => {
        const audio = document.getElementById('audio-element');
        const seekTime = (e.nativeEvent.offsetX / e.target.clientWidth) * duration;
        audio.currentTime = seekTime;
        console.log(`Seeked to ${seekTime} seconds`);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="audio-player bg-gray-100 p-4 rounded-lg shadow-md">
            {isLoading && (
                <div className="flex justify-center items-center h-20">
                    <Spinner size="xl" />
                </div>
            )}
            <audio
                id="audio-element"
                src={audioUrl}
                onTimeUpdate={handleTimeUpdate}
            />
            <div className="flex flex-col items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">{musicMetaData.songName}</h2>
                <p className="text-gray-600">{musicMetaData.songArtist}</p>
            </div>
            <div className="flex items-center justify-center space-x-4">
                <button
                    className="text-2xl text-gray-700 focus:outline-none"
                    onClick={handlePlayPause}
                >
                    <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                </button>
                <button
                    className="text-2xl text-gray-700 focus:outline-none"
                    onClick={handleMute}
                >
                    <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
                </button>
                <button
                    className="text-2xl text-gray-700 focus:outline-none"
                    onClick={handleReset}
                >
                    <FontAwesomeIcon icon={faRedoAlt} />
                </button>
                <div
                    className="w-full bg-gray-300 h-2 rounded-lg cursor-pointer"
                    onClick={handleSeek}
                >
                    <div
                        className="h-2 bg-green-500 rounded-lg"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                </div>
            </div>
            <div className="mt-2 text-gray-600 text-sm">
                <p>Current Time: {formatTime(currentTime)} / {formatTime(duration)}</p>
            </div>
        </div>
    );
};

export default AudioPlayer;

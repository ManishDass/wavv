import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faVolumeMute, faVolumeUp, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from '@chakra-ui/react';
import { useQuery } from 'react-query';

const fetchAudioUrl = async (videoId) => {
    const response = await axios.get(`https://wavv-server.vercel.app/youtube/${videoId}`, { responseType: 'blob' });
    const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
    return URL.createObjectURL(audioBlob);
};

const AudioTest = ({ videoId, musicMetaData }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const { data: audioUrl, isLoading, isError } = useQuery(['audioUrl', videoId], () => fetchAudioUrl(videoId));

    const handlePlayPause = () => {
        const audio = document.getElementById('audio-element');
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleMute = () => {
        const audio = document.getElementById('audio-element');
        audio.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    const handleReset = () => {
        const audio = document.getElementById('audio-element');
        audio.currentTime = 0;
        setCurrentTime(0);
        setIsPlaying(false);
        audio.pause();
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
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    if (isLoading) return <Spinner size="xl" />;

    if (isError) return <div>Error fetching audio</div>;

    return (
        <div className="audio-player bg-gray-100 p-4 rounded-lg shadow-md">
            <audio id="audio-element" src={audioUrl} onTimeUpdate={handleTimeUpdate} />
            <img src={`https://img.youtube.com/vi/${videoId}/sddefault.jpg`} alt="album-cover" />
            <div className="flex flex-col items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">{musicMetaData.songName}</h2>
                <p className="text-gray-600">{musicMetaData.songArtist}</p>
            </div>
            <div className="flex items-center justify-center space-x-4 mb-4">
                <button className="text-2xl text-gray-700 focus:outline-none" onClick={handlePlayPause}>
                    <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                </button>
                <button className="text-2xl text-gray-700 focus:outline-none" onClick={handleMute}>
                    <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
                </button>
                <button className="text-2xl text-gray-700 focus:outline-none" onClick={handleReset}>
                    <FontAwesomeIcon icon={faRedoAlt} />
                </button>
            </div>
            <div
                className="w-full bg-gray-300 h-2 rounded-lg cursor-pointer mb-2"
                onClick={handleSeek}
            >
                <div
                    className="h-2 bg-green-500 rounded-lg"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                />
            </div>
            <div className="mt-2 text-gray-600 text-sm">
                <p>
                    Current Time: {formatTime(currentTime)} / {formatTime(duration)}
                </p>
            </div>
        </div>
    );
};

export default AudioTest;

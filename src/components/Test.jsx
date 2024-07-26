import React, { useEffect, useState, useRef } from 'react';
import LyricsAPI from './LyricsAPI';

const Test = () => {
  const [lyrics, setLyrics] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchLyrics = async () => {
      const lyricsData = await LyricsAPI('Lil Nas X', 'INDUSTRY BABY');
      if (lyricsData && lyricsData.lyrics) {
        setLyrics(lyricsData.lyrics);
      } else {
        setLyrics('Failed to fetch lyrics.');
      }
    };

    fetchLyrics();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const scrollSpeed = 0.5; // Adjust scroll speed as needed

    const scrollLyrics = () => {
      if (container) {
        container.scrollTop += scrollSpeed;
        if (container.scrollTop >= container.scrollHeight - container.clientHeight) {
          container.scrollTop = 0; // Reset scroll position to top
        }
      }
    };

    const interval = setInterval(scrollLyrics, 15); // Adjust interval for smoother scrolling

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [lyrics]);

  return (
    <div className="relative h-screen bg-gray-900 text-white flex items-center justify-center overflow-hidden">
      <div
        ref={containerRef}
        className="absolute top-0 left-0 w-full h-full overflow-auto flex items-center justify-center"
        style={{ whiteSpace: 'pre-wrap' }}
      >
        <pre className="whitespace-pre-wrap break-words p-4 text-center text-lg font-semibold leading-relaxed">
          {lyrics}
        </pre>
      </div>
    </div>
  );
};

export default Test;
import { create } from 'zustand';

const parseJSON = (str, fallback) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return fallback;
  }
};

const useStore = create((set) => {
  const initialDarkMode =
    localStorage.theme === 'dark' ||
    (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const initialVideoid = localStorage.getItem('videoid') || '';
  const initialMetaData = parseJSON(localStorage.getItem('metadata') || {});
  const initialPlaybackTime = parseFloat(localStorage.getItem('playbackTime')) || 0;

  const subscribeToColorSchemeChanges = () => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        set({ darkMode: e.matches });
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  };

  // Load initial audio settings from localStorage or defaults
  const initialAudioState = {
    isPlaying: false,
    currentTime: initialPlaybackTime,
    duration: 0,
    audioUrl: '',
  };

  const audioElement = document.createElement('audio');

  audioElement.addEventListener('timeupdate', () => {
    set({ currentTime: audioElement.currentTime });
    localStorage.setItem('playbackTime', audioElement.currentTime.toString());
  });

  audioElement.addEventListener('ended', () => {
    set({ isPlaying: false });
  });

  subscribeToColorSchemeChanges();

  return {
    sharedState: false,
    videoid: initialVideoid,
    userDetails: {},
    metadata: initialMetaData,
    darkMode: initialDarkMode,
    audio: {
      ...initialAudioState,
      play: (url) => {
        audioElement.src = url;
        audioElement.play();
        set({ audioUrl: url, isPlaying: true });
      },
      pause: () => {
        audioElement.pause();
        set({ isPlaying: false });
      },
      setCurrentTime: (time) => {
        audioElement.currentTime = time;
        set({ currentTime: time });
      },
      setDuration: (duration) => {
        set({ duration });
      },
      togglePlayPause: () => {
        if (audioElement.paused) {
          audioElement.play();
          set({ isPlaying: true });
        } else {
          audioElement.pause();
          set({ isPlaying: false });
        }
      },
    },

    setSharedState: () => set((state) => ({ sharedState: !state.sharedState })),
    setVideoid: (videoid) => {
      localStorage.setItem('videoid', videoid);
      set({ videoid });
    },
    setUserDetails: (userDetails) => set({ userDetails }),

    setMetadata: (metadata) => {
      localStorage.setItem('metadata', JSON.stringify(metadata));
      set({ metadata });
    },

    setDarkMode: () => {
      const newMode = localStorage.theme === 'dark' ? 'dark' : 'light';
      localStorage.theme = newMode;
      set({ darkMode: newMode === 'dark' });
    },

    respectOSPreference: () => {
      localStorage.removeItem('theme');
      set({ darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches });
    },
  };
});

export default useStore;
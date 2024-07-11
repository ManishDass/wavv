// src/store/useStore.js
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

  subscribeToColorSchemeChanges();

  return {
    sharedState: false,
    videoid: initialVideoid,
    userDetails: {},
    metadata: initialMetaData,
    darkMode: initialDarkMode,
    audioUrl: localStorage.getItem('audioUrl') || '',
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    showMusicPlayerSlider: false,

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

    setAudioUrl: (audioUrl) => {
      localStorage.setItem('audioUrl', audioUrl);
      set({ audioUrl });
    },
    setIsPlaying: (isPlaying) => set({ isPlaying }),
    setCurrentTime: (currentTime) => set({ currentTime }),
    setDuration: (duration) => set({ duration }),
    setShowMusicPlayerSlider: (show) => set({ showMusicPlayerSlider: show }),
  };
});

export default useStore;
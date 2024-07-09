import { create } from 'zustand';

// Utility function to parse JSON safely
const parseJSON = (str, fallback) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return fallback;
  }
};



const useStore = create((set) => {
  // Initial dark mode based on localStorage.theme or prefers-color-scheme
  const initialDarkMode =
    localStorage.theme === 'dark' ||
    (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches);

  // Load initial videoid from localStorage
  const initialVideoid = localStorage.getItem('videoid') || '';

    // Load initial videoid from localStorage
    const initialMetaData = parseJSON(localStorage.getItem('metadata') || {});

  // Subscribe to system color scheme changes
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

  // Subscribe to color scheme changes when the store is created
  subscribeToColorSchemeChanges();

  return {
    sharedState: false,
    videoid: initialVideoid,
    userDetails: {},
    metadata: initialMetaData,
    darkMode: initialDarkMode,

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

    toggleDarkMode: () => {
      const newMode = localStorage.theme === 'dark' ? 'light' : 'dark';
      localStorage.theme = newMode;
      set({ darkMode: newMode === 'dark' });
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

    // Expose subscribeToColorSchemeChanges for manual subscription if needed
    subscribeToColorSchemeChanges,
  };
});

export default useStore;
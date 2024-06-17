import { create } from 'zustand';

const useStore = create((set) => {
  // Initial dark mode based on localStorage.theme or prefers-color-scheme
  const initialDarkMode =
    localStorage.theme === 'dark' ||
    (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return {
    videoid: '',
    userDetails: {},
    metadata: {},
    darkMode: initialDarkMode,

    setVideoid: (videoid) => set({ videoid }),
    setUserDetails: (userDetails) => set({ userDetails }),
    setMetadata: (metadata) => set({ metadata }),

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

    // Optional: Subscribe to system color scheme changes
    subscribeToColorSchemeChanges: () => {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e) => {
        set({ darkMode: e.matches });
      };

      mediaQuery.addListener(handleChange);

      return () => {
        mediaQuery.removeListener(handleChange);
      };
    },
  };
});

export default useStore;

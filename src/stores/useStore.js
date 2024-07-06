import { create } from 'zustand';

const useStore = create((set) => {
  // Initial dark mode based on localStorage.theme or prefers-color-scheme
  const initialDarkMode =
    localStorage.theme === 'dark' ||
    (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches);

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
    videoid: '',
    userDetails: {},
    metadata: {},
    darkMode: initialDarkMode,

    setSharedState: () => set((state) => ({ sharedState: !state.sharedState })),
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

    // Expose subscribeToColorSchemeChanges for manual subscription if needed
    subscribeToColorSchemeChanges,
  };
});

export default useStore;

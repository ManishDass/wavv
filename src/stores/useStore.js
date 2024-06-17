import { create } from 'zustand';

const useStore = create((set) => ({
  videoid: '',
  userDetails: {},
  metadata: {},
  darkMode: false,

  setVideoid: (videoid) => set({ videoid }),
  setUserDetails: (userDetails) => set({ userDetails }),
  setMetadata: (metadata) => set({ metadata }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));

export default useStore;



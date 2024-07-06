// useDarkMode.js
import { useEffect } from 'react';
import useStore from '../stores/useStore';

// This custom hooks basiclly check whether it is dark mode or not from system color schme which is defined in zustandStore

const useDarkMode = () => {
  const darkMode = useStore((state) => state.darkMode);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('bg-nigga');
    } else {
      root.classList.remove('bg-nigga');
    }
  }, [darkMode]);
};

export default useDarkMode;
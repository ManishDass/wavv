import './LoadingSpinner.css'; // Import the custom CSS for keyframes
import useDarkMode from '../hooks/useDarkMode';
import useStore from '../stores/useStore';

const LoadingSpinner = () => {
  const { darkMode } = useStore();
  useDarkMode(); //add or remove dark mode according to device-color-scheme

  return (
    <div className="h-dvh flex justify-center items-center">
      <div className="relative w-[calc(3*30px+26px)] h-[calc(2*30px+26px)] mx-auto mt-2.5 mb-7.5">
        <div className="absolute w-[26px] h-[26px] bg-orange-500 rounded-sm" id="square1"></div>
        <div className={`absolute w-[26px] h-[26px] rounded-sm ${darkMode ? 'bg-white' : 'bg-blue-500'}`} id="square2"></div>
        <div className="absolute w-[26px] h-[26px] bg-green-500 rounded-sm" id="square3"></div>
        <div className="absolute w-[26px] h-[26px] bg-slate-500 rounded-sm" id="square4"></div>
        <div className="absolute w-[26px] h-[26px]  bg-red-500 rounded-sm" id="square5"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
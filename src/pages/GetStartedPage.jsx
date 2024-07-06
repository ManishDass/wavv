// src/components/pages/YourComponent.jsx
import Logo from '../assets/LogoWithText.svg'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const YourComponent = () => {
  const navigate = useNavigate()
  return (
    <div
      className=" flex flex-col justify-center items-center
		bg-no-repeat bg-cover bg-center h-dvh px-6
    bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.5),rgba(0,0,0,1)),url('/images/getstarted-background.jpeg')]
    "> 
    <div className="h-14 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
      <img src={Logo} className='bg-cover bg-no-repeat h-[4.5rem] mb-auto -mt-8' alt='logo' />
      <h1 className="text-white text-2xl mb-5 text-center">Welcome to Wavv</h1>
      <p className="text-neutral-400 text-sm font-santoshi-light mb-8 mx-4 text-center">A open-source music player made for everyone, enjoy ad-free listening experience, vocal for local, if you like kindly share it with your friends</p>
      <div className="bg-[#62CD5D] text-white px-[6rem] py-6 rounded-[25px] mb-14 cursor-pointer" onClick={()=>navigate('/choose-color-mode')}>
        <p className='text-lg w-full transition-transform duration-200 ease-in-out transform hover:bg-green-600 active:bg-green-700 active:scale-95 active:shadow-lg cursor-pointer'>Get Started</p>
      </div>
    </div>
  );
}

export default YourComponent;

import { useNavigate } from 'react-router-dom';
import './NotFound.css'; // Import the custom CSS for keyframes
import TopNavigation from '../components/TopNavigation';

const NotFound = ({ errorDetails }) => {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col h-screen items center justify-center'>
            {/* Top Navigation Bar */}
            <TopNavigation options={{ left: 'back', center: 'logo' }} />

      <main className="bl_page404 flex flex-col h-screen items center justify-center">

        <h1 className='text-2xl font-sans mb-5'>{errorDetails}</h1>
        <div className="bl_page404__wrapper flex flex-col px-10 items-center justify-center">
          <img src="./images/cloud.png" alt="cloud_warmcasino.png" />
          <div className="bl_page404__el1 bg-center bg-no-repeat" style={{ backgroundImage: 'url(./images/404-1.png)' }}></div>
          <div className="bl_page404__el2 bg-center bg-no-repeat" style={{ backgroundImage: 'url(./images/404-2.png)' }}></div>
          <div className="bl_page404__el3 bg-center bg-no-repeat" style={{ backgroundImage: 'url(./images/404-3.png)' }}></div>
          <a className="bl_page404__link px-10" onClick={() => navigate('/home')} >go home</a>
        </div>
      </main>
    </div>
  )
}

export default NotFound
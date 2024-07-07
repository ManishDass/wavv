import HeartIcon from '../assets/images/HeartIcon.svg?react';
import Play from '../assets/images/Play.svg?react';
import usePlaySong from '../hooks/usePlaySong';

const Playlist = ({items}) => {
  const {playSong} = usePlaySong();

  return (
    <div className='text-white flex flex-col h-[38%] text-sm font-sans justify-between text-wrap overflow-hidden'>
        <div className='flex flex-row justify-between items-center mt-8 mb-8 px-8'>
          <h1 className='text-[1.2rem]'>Playlist</h1>
          <p className='font-santoshi-light text-xs'>See More</p>
        </div>
        {items.slice(0, 10).map((obj, index) => (
          <div key={index} className='flex justify-around items-center pb-5'>
            <div className=' rounded-full h-10 w-10 flex items-center justify-center backdrop-blur-md bg-[#2C2C2C]'>
              <Play onClick={()=>playSong({name: obj.name, artist: obj.artist})} className='cursor-pointer'/>
            </div>
            <div className='flex flex-col gap-1 -ml-11  basis-[20%]'>
              <h3 className='text-sm font-santoshi-bold'>{obj.name}</h3>
              {/* {obj.songName.length > 9 ? obj.songName.slice(0,9) : obj.songName} */}
              <p className='text-xs font-santoshi-light  '>{obj.artist}</p>
            </div>
            <p className='text-sm font-santoshi-light   basis-[10%]'>{obj.duration || 'NaN'}</p>
            <HeartIcon className='basis-[7%]' />
          </div>
        ))
        }
      </div>
  )
}

export default Playlist
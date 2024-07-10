import React from 'react'

const MiniPlayer = () => {
  return (
      <div className='fixed bottom-[4rem]'>
          <div
            className="relative w-full h-16 bg-cover bg-center"
            style={{ backgroundImage: `url(https://img.youtube.com/vi/${videoid}/sddefault.jpg)` }}
          >
            <div className="backdrop-blur-xl bg-white/30 h-full flex justify-between items-center w-screen rounded-t-lg">

              <img className='bg-cover w-[3.3rem] h-[3.3rem] ml-[1rem]' src={`https://img.youtube.com/vi/${videoid}/sddefault.jpg`} alt={metadata.songName} />

              <div className="marquee-container overflow-hidden flex flex-col">
                <p className="marquee-text">
                  <span className="inline-block">{metadata.songName}</span>
                  <span className="inline-block pl-2">•</span>
                  <span className="inline-block pl-2">{metadata.songArtist}</span>
                </p>
              </div>

              <div className=' rounded-full h-10 w-10 flex items-center justify-center backdrop-blur-md bg-[#2C2C2C] '>
                <HeartIcon className="h-6 w-6 cursor-pointer" fill={'#42C83C'} stroke={'#737373'} />
              </div>
              <div className=' rounded-full h-10 w-10 flex items-center justify-center backdrop-blur-md bg-[#2C2C2C] mr-4'>
                <Play className='cursor-pointer' />
              </div>
            </div>
          </div>
        </div> 
  )
}

export default MiniPlayer
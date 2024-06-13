import YTMusic from "ytmusic-api"
import React,{useEffect} from 'react'

const TestYT = () => {
  const ytmusic = new YTMusic()

  useEffect(()=>{

    
    ytmusic.search("Never gonna give you up").then(songs => {
        console.log(songs)
    })


  },[])

  return (
    <div>TestYT</div>
  )
}

export default TestYT


// const ytmusic = new YTMusic()
// await ytmusic.initialize(/* Optional: Custom cookies */)

// ytmusic.search("Never gonna give you up").then(songs => {
// 	console.log(songs)
// })

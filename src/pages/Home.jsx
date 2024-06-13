import React from 'react'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  let {logout } = useAuth()
  return (
    <div>
      <button className="bg-red-600" onClick={logout}>Logout</button>
    </div>
  )
}

export default Home
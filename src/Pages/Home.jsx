import React from 'react'
import { Link } from 'react-router'

const Home = () => {
  return (
    <div className='flex justify-center items-center w-screen h-screen flex-col bg-slate-300'>
      <h1 className='border-b-2 border-slate-800 text-4xl mb-12'>Home</h1>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </div>
  )
}

export default Home
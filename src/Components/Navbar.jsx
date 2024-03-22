import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
      <div className='mycontainer flex justify-between items-center px-4 py-5 h-14'>
        <div className='logo font-bold text-white text-2xl'>
          <span className='text-green-500'> &lt;</span>
          <span>Key</span>
          <span className='text-green-500'>Pod&gt;</span>
        </div>
        {/* <ul className='flex gap-4'>
          <li className='hover:font-bold cursor-pointer'>Home</li>
          <li className='hover:font-bold cursor-pointer'>About</li>
          <li className='hover:font-bold cursor-pointer'>Contact</li>
        </ul> */}
        <button className='bg-green-700 p-1 flex justify-between items-center rounded-full ring-1 ring-white'>
          <FontAwesomeIcon className=' text-2xl' icon={faGithub} />
          <span className='font-bold px-2'>Github</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar

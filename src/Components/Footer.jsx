import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
        <>
            <div className='bg-slate-800 text-white flex flex-col justify-center bottom-0 items-center w-full'>
                <div className='logo font-bold text-white text-2xl'>
                    <span className='text-green-500'> &lt;</span>
                    <span>Key</span>
                    <span className='text-green-500'>Pod&gt;</span>
                </div>
                <div className='flex gap-1'>
                    Created With <lord-icon
                        src="https://cdn.lordicon.com/igciyimj.json"
                        trigger="hover"
                        stroke="light">
                    </lord-icon> by Vikram
                </div>
            </div>
        </>
    )
}

export default Footer

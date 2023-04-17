import React from 'react'
import Link from 'next/link'
import ConnectionButton from "./ConnectionButton"



const Navbar = () => {
  return (
      <div className='bg-gray-300 py-4 justify-between px-8 flex font-mono'>
         <div className='flex justify-between'>
            <div className='flex px-5 text-lg'>
            <Link href="/" className='mx-10'> Home</Link>
            </div>
            <div className='flex px-5 text-lg'>
            <Link href="/launchpads"> List Launchpads</Link>  
            </div>
            <div className='flex px-5 text-lg'>
            <Link href="/MarketPlace"> Market</Link>  
            </div>
            <div className='flex px-5 text-lg'>
            <Link href="/MarketPlace2"> Top Users</Link>  
            </div>
            {/* <p>THIS IS WORKING</p> */}

         </div>
         <ConnectionButton />
    </div>
  )
}

export default Navbar
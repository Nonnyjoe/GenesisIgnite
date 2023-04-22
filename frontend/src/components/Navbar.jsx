import React from 'react'
import Link from 'next/link'
import ConnectionButton from "./ConnectionButton"
import styles from "../styles/Header.module.css"
import ignitelogo from "../images/web2.png";
import Image from "next/image";



const Navbar = () => {
  return (
      <div className={` ${styles.header} py-4 mx-[3rem] h-[5.5rem] justify-between px-10 flex font-mono cursor-pointer`}>
         <div className='flex justify-between'>
          <Link href="../" className='cursor-pointer'>
          <div className={styles.Image}><Image className={styles.Logo}  src={ignitelogo} alt= "iginite logo"/></div>
            {/* <p>THIS IS WORKING</p> */}
            
         </Link>
         </div>
         <ConnectionButton />
    </div>
  )
}

export default Navbar
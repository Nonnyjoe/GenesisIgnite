import React from 'react'
import  styles2  from "../styles/aboutUs.module.css"
import  styles3  from "../styles/reusables.module.css"
import Image from "next/image";
import twitterlogo from "../images/twitterlogo.png"
import githublogo from "../images/githublogo.png"
import discordlogo from "../images/discordlogo.png"
import logo from "../images/web2.png"
import Link from 'next/link';




const FooterSec = () => {
  return (
<div className={`  ${styles2.aboutUs} mt-[-4rem]`}>
        <div className={`flex flex-row px-[4rem] pb-0 pt-[5rem]`}>
        <div className={` ${styles2.glassCard6}  flex flex-col p-[6rem] pt-[4rem]`}>
        <div className='flex flex-row gap-10 justify-between'>
          <div className='w-[74vw]'>
            <p className='text-4xl font-pop'> PARTICIPATE IN LAUNCHPADS</p>
          </div>
          <div className='w-[35%] mt-2'>
            <button className={`${styles3.btnHover} ${styles3.color7}`}>Launch App</button>
          </div>
        </div>
       <hr className="border-t border-gray-300 my-8 h-5 z-13"></hr>
        <div className='flex flex-row gap-[10rem] font-pop'>
          <div className='flex flex-row gap-3'>
              <div className={`${styles3.footerSocials2} mt-[-1rem]`}>
              <Image src={logo} />
              </div>
              <p>GENESIS IGNITE</p>
          </div>
          <div>
            <p> Copyright © 2023, Ignite Team </p>
          </div>
          <div className='flex flex-row gap-7'>
            <Link href={`https://twitter.com/GenesisIgnite`}>
            <div className={styles3.footerSocials}><Image src={twitterlogo} /></div>
            </Link>
            <Link href={`https://github.com/Nonnyjoe/BunzzGenesisIgnite`}>
            <div className={styles3.footerSocials}><Image src={githublogo} /></div>
            </Link>
            <div className={styles3.footerSocials}><Image src={discordlogo} /></div>
          </div>
        </div>
        </div>
        </div>
        </div>  
  )
}

export default FooterSec;
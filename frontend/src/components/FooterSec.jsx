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
<div className={`  ${styles2.aboutUs} md:mt-[-4rem] mt-[3rem] relative w-screen mb-2`}>
        <div className={`flex md:flex-row md:px-[4rem] md:pb-0 md:pt-[5rem] ml-auto mr-auto`}>
        <div className={` ${styles2.glassCard6}  flex flex-col p-[1rem] md:p-[6rem] md:pt-[4rem] ml-auto mr-auto`}>
        <div className='flex flex-row md:gap-10 gap-3 justify-between'>
          <div className='w-[74vw]'>
            <p className='md:text-4xl font-pop'> PARTICIPATE IN LAUNCHPADS</p>
          </div>
          <div className='w-[35%] mt-2'>
            <button className={`${styles3.btnHover2} ${styles3.color7} text-sm w-[100px] md:w-[150px] h-[35px] md:h-[40px] cursor-pointer mt-[-1rem] md:mt-[.7rem] text-white text-center border-none rounded-[50px]`}>Launch App</button>
          </div>
        </div>
       <hr className="border-t border-gray-300 md:my-8 my-2 h-5 z-13"></hr>
        <div className='flex flex-row md:gap-[10rem] gap-5 font-pop'>
          <div className='md:flex flex-row gap-3 hidden '>
              <div className={`${styles3.footerSocials2} mt-[-1rem]`}>
              <Image src={logo} />
              </div>
              <p className=''>GENESIS IGNITE</p>
          </div>
          <div>
            <p className='sm:text-xs md:text-base'> Copyright © 2023, Ignite Team </p>
          </div>
          <div className='flex flex-row md:gap-7 gap-3'>
            <Link href={`https://twitter.com/GenesisIgnite`}>
            <div className={`${styles3.footerSocials3} md:h-[2rem] md:w-[2rem] h-[1.3rem] w-[1.3rem]`}><Image src={twitterlogo} /></div>
            </Link>
            <Link href={`https://github.com/Nonnyjoe/BunzzGenesisIgnite`}>
            <div className={`${styles3.footerSocials3} md:h-[2rem] md:w-[2rem] h-[1.3rem] w-[1.3rem]`}><Image src={githublogo} /></div>
            </Link>
            <div className={`${styles3.footerSocials3} md:h-[2rem] md:w-[2rem] h-[1.3rem] w-[1.3rem]`}><Image src={discordlogo} /></div>
          </div>
        </div>
        </div>
        </div>
        </div>  
  )
}

export default FooterSec;
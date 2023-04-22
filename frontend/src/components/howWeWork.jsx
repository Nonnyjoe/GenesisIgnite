import  styles  from "../styles/index.module.css"
import  styles2  from "../styles/aboutUs.module.css"
import Image from "next/image";
import ignitelogo from "../images/web2.png"
import rocket from "../images/ggf.png"
import rocket2 from "../images/HowWeWork2.png"

const HowWeWork = () => {
  return (
        <div className={`  ${styles2.aboutUs} mt-[-20rem]`}>
        <div className={`p-[6rem] mt-7 flex flex-row gap-11 px-[4rem]`}>
            <div className={` ${styles2.glassCard8} p-[6rem] `}>

            </div>
             <div className={` ${styles2.glassCard7} p-[6rem] pt-[4rem]`}>
                <p className="font-header font-headers uppercase text-4xl text-center mb-5 text-indigo-600">How Genesis Ignite Works</p>
                <h1 className="font-EudoxusSansBold text-3xl mb-8"> Get started with just a few clicks</h1>

               <div className={`flex flex-row  space-x-4 mb-5 ${styles2.shift}`}>
                <div className={`${styles2.bullet} font-headers text-2xl`}>
                    <p> 01 </p>
                </div>
                   <div className="w-[20rem] font-pop text-xl">
                    <p>Convert your tokens to our base currency through or swap or P2P platform.</p>
                </div>
               </div>
               <div className={`flex flex-row  space-x-4 mb-5 ${styles2.shift}`}>
               <div className={`${styles2.bullet} font-headers text-2xl`}>
                    <p> 02 </p>
                </div>
                    <div className="w-[20rem] font-pop text-xl">
                    <p>Participate in LaunchPads or presales to receive presale tokens, also earn NFT rewards for your participation. </p>
                </div>
               </div>

                <div className={`flex flex-row  space-x-4 mb-5 ${styles2.shift}`}>
                    <div className={`${styles2.bullet} font-headers text-2xl`}>
                    <p> 03 </p>
                </div>
                    <div className="w-[20rem] font-pop text-xl">
                    <p> Track and claim your Launchpad and presale tokens from our platform. </p>
                </div>
               </div>
            </div>

        </div>
        </div>        
  )
}

export default HowWeWork;
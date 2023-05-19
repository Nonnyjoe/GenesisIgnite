import  styles  from "../styles/index.module.css"
import  styles2  from "../styles/reusables.module.css"
import PageLayout from "../layout/PageLayout";
import Image from "next/image";
import ignitelogo from "../images/web2.png"
import rocket from "../images/ggf.png"
import Link from "next/link";
import AboutUs from "./aboutUs"


export default function Hero() {
    return(
        <div className={`relative w-screen ${styles.body}`}>
           <div className={styles.innerDiv}></div>
            <div className={`${styles2.padding} ${styles.glassCard} px-2 md:px-9 py-2 md:py-5 ml-auto mr-auto mt-5 md:mb-5`}>
                <nav className={`${styles.navi} flex flex-row p-2 md:p-5`}>
                    <div className={` h-[5rem] w-[7rem] md:h-[7rem] md:w-[10rem]`}>
                        <Image src={ignitelogo} alt= "iginite logo"/>
                    </div>
                    <div className={`${styles.navDiv} font-headers text-xl  w-auto md:w-[50%] flex flex-row`}>
                    <div className="hidden md:flex md:w-[60%] md:justify-between">
                       <div className={`${styles2.navLink} md:text-lg`}> <Link href="/"> Home</Link></div>
                        <div className={`${styles2.navLink} md:text-lg`}><Link href="/documentation">Documentation</Link> </div>
                    </div>
                    <div className="w-auto sm:mt-[-1rem]">
                        <Link href="/dashboard">
                        <button className={`${styles2.btnHover2} ${styles2.color7} text-sm w-[100px] md:w-[150px] h-[35px] md:h-[40px] cursor-pointer mt-[-1rem] md:mt-[.7rem] text-white text-center border-none rounded-[50px] `}>Launch App</button>
                        </Link>
                    </div>
                   
                    </div>
                </nav>
                <div className="flex flex-col md:flex-row md:justify-between justify-center">
                    <div className="md:py-20 py-10  md:pl-10 px-5">
                      <p className="text-4xl md:text-6xl font-pop font-bold title-font md:leading-[4rem] ">
                      Introducing Genesis Ignite   </p>  
                        <br />
                         <span className={`${styles2.navLink} text-blue-100 md:text-4xl text-2xl md:mt-4`}> A safe gamified and decentralized launchpad for early-stage investors. </span> 
                        <p className="text-lg mt-4">Get early-access to top-tier blockchain projects by transacting with Genesis Ignite and enjoy the potential for high returns.</p>
                    
                    </div>
                    <div className="w-full md:w-[40%] md:mt-[5rem] flex justify-center items-center md:h-[20rem]">
                        <div className={`h-[18rem] w-[11rem] md:h-[20rem] lg:h-[25rem] md:w-[35rem] md:mt-[4rem] md:ml-[2rem] d-none bg-cover bg-center  ${styles.heroImg}`}>
                    </div>
                    </div>
                </div>
            </div>

           
        </div>  
      
    )
}
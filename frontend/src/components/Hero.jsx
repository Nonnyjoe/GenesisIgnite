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
        <div className={styles.body}>
           <div className={styles.innerDiv}></div>
            <div className={`${styles2.padding} ${styles.glassCard} px-9 py-5`}>
                <nav className={`${styles.navi} flex flex-row  p-5`}>
                    <div className={`${styles.Image}`}>
                        <Image src={ignitelogo} alt= "iginite logo"/>
                    </div>
                    <div className={`${styles.navDiv} font-headers text-xl w-[50%] flex flex-row`}>
                       <div className={`${styles2.navLink}`}> <Link href="/"> Home</Link></div>
                        <div className={`${styles2.navLink}`}><Link href="/documentation">Documentation</Link> </div>
                    <div>
                        <Link href="/dashboard">
                        <button className={`${styles2.btnHover} ${styles2.color7} text-2xl`}>Launch App</button>
                        </Link>
                    </div>
                   
                    </div>
                </nav>
                <div className="flex flex-row justify-between">
                    <div className="py-20 pl-10">
                      <p className="text-6xl font-EudoxusSansBold font-bold title-font leading-[4rem]">
                      Introducing Genesis Ignite   </p>  
                        <br />
                         <span className={`${styles2.navLink} text-blue-100 text-4xl mt-4`}> A gamified, decentralized and safest launchpad for early-stage investors. </span> 
                        <p className="text-xl mt-4">Get early-access to top-tier blockchain projects by transacting with Genesis Ignite Tokens ($GIT) and enjoy the potential for high returns.</p>
                    
                    </div>
                    <div className={`h-[25rem] w-[35rem] d-none bg-cover bg-center mr-10 ${styles.heroImg}`}>
                        {/* <Image src={rocket} alt= "iginite logo" className={`${styles.image} hidden`}/> */}
                    </div>
                </div>
            </div>
                <br/>
                <br/>
           
        </div>  
      
    )
}
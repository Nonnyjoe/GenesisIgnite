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
                        <button class={`${styles2.btnHover} ${styles2.color7} text-2xl`}>Launch App</button>
                        </Link>
                    </div>
                   
                    </div>
                </nav>
                <div className="flex flex-row justify-between">
                    <div className="py-20 pl-10">
                      <p className="text-7xl font-EudoxusSansBold font-bold title-font leading-[6rem]">
                        Launch your 
                        <br />
                         <span className={`${styles2.navLink} text-blue-800`}> dream</span> startup 
                        <br />
                        With Us
                    </p>   
                    </div>
                    <div className={`h-[25rem] w-[25rem] d-none bg-cover bg-center mr-10 ${styles.heroImg}`}>
                        {/* <Image src={rocket} alt= "iginite logo" className={`${styles.image} hidden`}/> */}
                    </div>
                </div>
            </div>
                <br/>
                <br/>
           
        </div>  
      
    )
}
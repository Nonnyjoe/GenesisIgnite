import  styles  from "../styles/index.module.css"
import  styles2  from "../styles/reusables.module.css"
import PageLayout from "../layout/PageLayout";
import Image from "next/image";
import ignitelogo from "../images/web2.png"
import rocket from "../images/ggf.png"
import Link from "next/link";
import AboutUs from "./aboutUs"


export default function Home() {
    return(
        <div className={styles.body}>
           <div className={styles.innerDiv}></div>
            <div className={`${styles2.padding} ${styles.glassCard} px-9 py-5`}>
                <nav className={`${styles.navi} flex flex-row  p-5`}>
                    <div className={`${styles.Image}`}>
                        <Image src={ignitelogo} alt= "iginite logo"/>
                    </div>
                    <div className={`${styles.navDiv} w-[50%]`}>
                    <Link href="/">Home</Link>
                    <Link href="/documentation">Documentation</Link>
                    <Link href="/dashboard">
                    <button class={`${styles2.btnHover} ${styles2.color7}`}>Launch App</button>
                    </Link>
                    </div>
                </nav>
                <div className="flex flex-row justify-between">
                    <div className="py-20 pl-5">
                      <p className="text-6xl font-bold leading-[5rem]">
                        Launch your WEB 3.0 
                        <br />
                        startup dreams 
                        <br />
                        With Us
                    </p>   
                    </div>
                    <div className={`h-[25rem] w-[25rem] d-none bg-cover bg-center mr-10 ${styles.heroImg}`}>
                        {/* <Image src={rocket} alt= "iginite logo" className={`${styles.image} hidden`}/> */}
                    </div>
                </div>
                 <div className={` ${styles.glassCard} p-8`}>
                    <p className="text-2xl">
                        We offer an intuitive launchpad that empowers businesses and creators with easy-to-use tools. Our platform is designed to be inclusive and user-friendly, supporting a wide range of tokens and currencies for maximum flexibility and convenience
                    </p>
                </div>
            </div>
                <br/>
                <br/>
           
        </div>  
      
    )
}
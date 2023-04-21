import  styles  from "../../styles/index.module.css"
import  styles2  from "../../styles/aboutUs.module.css"
import  styles3  from "../../styles/reusables.module.css"
import PageLayout from "../../layout/PageLayout";
import Image from "next/image";
import ignitelogo from "../../images/web2.png"
import Link from "next/link";


export default function Documentation() {

    return(
        <div className={` mt-[21rem] ${styles2.aboutUs}`}>
           <div className={styles.innerDiv}></div>
           <div className={`${styles2.padding} ${styles.glassCard3} px-9 py-5`}>
           <nav className={`${styles.navi} flex flex-row  p-5`}>
                    <div className={`${styles.Image}`}>
                        <Image src={ignitelogo} alt= "iginite logo"/>
                    </div>
                    <div className={`${styles.navDiv} font-headers text-xl w-[50%] flex flex-row`}>
                       <div className={`${styles3.navLink}`}> <Link href="../"> Home</Link></div>
                        <div className={`${styles3.navLink}`}><Link href="/documentation">Documentation</Link> </div>
                    <div>
                        <Link href="/dashboard">
                        <button class={`${styles3.btnHover} ${styles3.color7} text-2xl`}>Launch App</button>
                        </Link>
                    </div>
                   
                    </div>
                </nav>
                <div className="mt-[4rem] flex align-middle justify-center text-center">
                     <h1 className="text-4xl text-white font-EudoxusSansBold"> DOCUMENTATION </h1>

                </div>
            </div>
           
        </div>  
      
    )

}
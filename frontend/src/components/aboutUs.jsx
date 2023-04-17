import  styles  from "../styles/index.module.css"
import  styles2  from "../styles/aboutUs.module.css"
import PageLayout from "../layout/PageLayout";
import Image from "next/image";
import ignitelogo from "../images/web2.png"
import rocket from "../images/ggf.png"
import Link from "next/link";
import USDC from "../images/usdcc.png"
import DAI from "../images/dailogoo.png"
import ETH from "../images/ethlogoo.png"

export default function AboutUs() {

    return(
        <div className={` mt-[21rem] ${styles2.aboutUs}`}>
            <div className={` px-9 pt-5`}>
            <div className={` ${styles.glassCard2} p-[6rem] `}>
                <h1 className="font-headers text-xl mb-4 uppercase text-indigo-600"> About our Ecosystem</h1>
                <p className="text-xl leading-[3rem] font-pop">
                    We offer an intuitive launchpad that empowers businesses and creators with easy-to-use tools. Our platform is designed to be inclusive and user-friendly, supporting a wide range of tokens and currencies for maximum flexibility and convenience
                </p>
                <div className="mt-12">
                    <h1 className="font-headers uppercase text-xl mb-7 text-indigo-600"> tokens we support</h1>
                    <div className="flex flex-row gap-11 mt-4">
                        <div className={styles2.suportedTokens}>
                            <Image src={ETH} />
                        </div>
                        <div className={styles2.suportedTokens}>
                            <Image src={USDC} />
                        </div>
                          <div className={styles2.suportedTokens}>
                            <Image src={DAI} />
                        </div>
                        
                    </div>
                </div>
            </div>

            </div>
        </div>  
      
    )

}
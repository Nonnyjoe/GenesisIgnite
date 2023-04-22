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
            <div className={` ${styles.glassCard2} p-[6rem] text-center `}>
                <h1 className="font-headers text-4xl mb-4 uppercase text-indigo-400"> About our Ecosystem</h1>
                <p className="text-2xl leading-[3rem] font-pop">
                Welcome to Genesis Ignite, the decentralized platform that revolutionizes how startups and small businesses raise capital. Our gamified experience and cutting-edge blockchain technology offer a secure and transparent way for projects to raise funds through token offerings and presales. With an intuitive interface and user-friendly design, we simplify the fundraising process for both project creators and investors. Join us today and explore the future of decentralized finance!
                </p>
                <div className="mt-12 text-center">
                    <h1 className="font-headers uppercase text-3xl text-center mb-7 text-indigo-400"> tokens we support</h1>
                    <div className="flex flex-row gap-20 mt-4 justify-center">
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
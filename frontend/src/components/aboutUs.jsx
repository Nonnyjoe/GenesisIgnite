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
        <div className={` mt-[3rem] md:mt-[5rem] ${styles2.aboutUs} flex justify-center items-center w-screen`}>
            <div className={``}>
            <div className={` ${styles.glassCard2} p-[1rem] pt-[1.5rem] md:p-[4rem] lg:p-[6rem] text-center `}>
                <h1 className="font-headers text-2xl md:text-4xl mb-4 uppercase text-indigo-400"> About our Ecosystem</h1>
                <p className="md:text-2xl md:leading-[3rem] leading-7 font-pop text-white">
                Welcome to Genesis Ignite, the decentralized platform that revolutionizes how startups and small businesses raise capital. Our gamified experience and cutting-edge blockchain technology offer a secure and transparent way for projects to raise funds through token offerings and presales. With an intuitive interface and user-friendly design, we simplify the fundraising process for both project creators and investors. Join us today and explore the future of decentralized finance!
                </p>
                <div className="mt-12 text-center">
                    <h1 className="font-headers uppercase text-2xl md:text-4xl text-center mb-7 text-indigo-400"> tokens we support</h1>
                    <div className="flex flex-row gap-10 md:gap-20 mt-4  md:mt-6 justify-center">
                        <div className={`h-[4rem] w-[4rem] md:w-[5rem] md:h-[5rem] ${styles2.suportedTokens}`}>
                            <Image src={ETH} />
                        </div>
                        <div className={`h-[4rem] w-[4rem] md:w-[5rem] md:h-[5rem] ${styles2.suportedTokens}`}>
                            <Image src={USDC} />
                        </div>
                          <div className={`h-[4rem] w-[4rem] md:w-[5rem] md:h-[5rem] ${styles2.suportedTokens}`}>
                            <Image src={DAI} />
                        </div>
                        
                    </div>
                </div>
            </div>

            </div>
        </div>  
      
    )

}
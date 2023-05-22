import  styles  from "../styles/index.module.css"
import  styles2  from "../styles/aboutUs.module.css"
import PageLayout from "../layout/PageLayout";
import Image from "next/image";
import Bunzz from "../images/bunzzLogo.png"
import Web3Africa from "../images/web3AfricaLogo.svg"
import ChainID from "../images/chainIDELogo.png"
import Web3Bridge from "../images/web3bridgeLogo.svg";
import SpheronLogo from "../images/spheronLogo.png"
import circleLogo from "../images/circleLogo2.png"
import Chainlink from "../images/Chainlink_Logo_Blue.svg.png"

export default function Sponsors() {

    return(
        // <div className={` mt-[18rem] ${styles2.aboutUs}`}>
        //     <div className={` px-9 pt-5`}>
        //     <div className={` ${styles.glassCard2} p-[6rem] flex flex-row`}>

   
                    
            // </div>

        //     </div>
        // </div>  
      

        <div className={`  ${styles2.aboutUs}  mt-[1rem] mb-[5rem]`}>
        <div className={`flex flex-row pl-[rem] justify-center items-center`}>
            <div className={` ${styles2.glassCard5}  flex flex-row p-[6rem] gap-10`}>
              <div className="w-[60%]">
                <p className="font-headers uppercase text-5xl mb-5 text-indigo-600">Partners </p>
                <h1 className="font-pop text-4xl leading-[3.9rem] mb-5"> We Collaborate with Leading Tech Giant Companies</h1>
                <p className="text-xl font-pop leading-[1.9rem]">
                Our vision is fueled by the power of strategic partnerships with industry leaders. These esteemed brands play a vital role in driving our progress towards success.
                </p> 
            </div>
         <div className="w-[40%] flex flex-col gap-5">
                    <div className={`flex flex-row gap-5 `}>
                        <div className={`${styles2.supporters} ${styles2.moveUp}`}>
                            <Image src={circleLogo} />
                        </div>
                        <div className={`${styles2.supporters} ${styles2.moveRight}`}>
                            <Image src={Web3Africa} />
                        </div>
                    </div>
                    <div className="flex flex-row gap-5">
                        <div className={`${styles2.supporters} ${styles2.moveDown}`}>
                            <Image src={Chainlink} />
                        </div>
                        <div className={`${styles2.supporters} ${styles2.moveRight}`}>
                            <Image src={Web3Bridge} />
                        </div>
                    </div>
                </div>
        </div>
        </div>  
        </div>
 


    )

}
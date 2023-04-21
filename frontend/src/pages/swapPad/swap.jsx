import styles2 from "../../styles/dashboard2.module.css"
import styles from "../../styles/swap.module.css"
import ignitelogopure from "../../images/ignitelogopure.png"
import Link from 'next/link';
import rocketicon from "../../images/rocketicon.png"
import usericon from "../../images/usericon.png"
import liquidity from "../../images/liquidity.png"
import transaction from "../../images/itansactions.png"
import cylinder from "../../images/cylinder.png"
import Image from "next/image"
import { useAccount, useContractRead, Suspense, useContractReads, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import {LaunchPadFacoryAddr} from "../../utils/addresses";
import LPFactoryABI from "../../utils/LPFactory.json";
import {GeneAddress} from "../../utils/addresses"
import {swapPadAddr} from "../../utils/addresses"
import { useContext, useState } from "react";
import SwappOut from "./form1";
import SwappIn from "./form2";
import tokenABI from "../../utils/token_ABI.json"
import Tilt from 'react-parallax-tilt';


export default function Dcontents(){
  const { address } = useAccount();
const [UserBalance, setUserBalance] = useState();
const [swapBalance, setSwapBalance] = useState();
  const LaunchPadFactory = LaunchPadFacoryAddr();
  const [showDetails, setShowDetails] = useState(true);

  const handleClick1 = () => {
    setShowDetails(false);
  };

  const handleClick2 = () => {
    setShowDetails(true);
  };

 /// FETCH USER DATA FROM THE CONTRACT 
  const { data: LPData, isError: ReadsError, isLoading: ReadsLoading } = useContractReads({
    contracts: [
      {
        address: GeneAddress(),
        abi: tokenABI,
        functionName: 'balanceOf',
        args:[address],
      },
       {address: GeneAddress(),
        abi: tokenABI,
        functionName: 'balanceOf',
        args:[swapPadAddr()],
      },
    ],
      watch: true,
      onSuccess: (data) => {
      setUserBalance((Math.floor(data[0]).toString()) ?? "0.00");
      setSwapBalance((Math.floor(data[1]).toString()) ?? "0.00");
        console.log(UserBalance);
  }})


    return(
        <div className={`${styles2.Dcontents} flex flex-row`}>
            <div className="mt-12 ml-5">
                 <div className={styles.swaplhstop}>
                <div>
                  <Image src={liquidity}/>
                </div>
                <div >
                  <p className={`${styles.lhsheader} uppercase text-xs leading-8 font-pop`}>Available Liquidity</p>
                  <p className={styles.lhschild}>{Math.floor(swapBalance / 10**18)}</p>
                </div>
              </div>
              <div className={styles.swaplhsbottom}>
                <div className="ml-[-4rem]">
                  <Image src={transaction}/>
                </div>
                <div className="ml-4">
                  <p className={`${styles.lhsheader} uppercase text-xs leading-8 font-pop`}>Your Balance</p>
                  <p className={styles.lhschild}>{(Math.floor(UserBalance / 10**18))}</p>
                </div>
              </div>
            </div>
            <div className="">
              <Tilt>
                <div className={`${styles.swapForm}`}>
                    <div>
                        <div className={styles.swapoptiontop}>
                        <button
                        type="button"
                        className={`${styles.buttons} font-pop text-md ${(showDetails == true) ? styles.button2 : "" }`}
                        onClick={handleClick2}
                        >
                        {"SWAP IN"}
                        </button>

                        <button
                        type="button"
                        className={`${styles.buttons} font-pop text-md ${(showDetails == false) ? styles.button2 : "" }`}
                        onClick={handleClick1}
                        >
                        {"SWAP OUT"}
                        </button>
                        </div>
                      {showDetails ? <SwappIn /> : <SwappOut />}
                    </div>
                </div>
              </Tilt>
            </div>
        </div>
    )
}
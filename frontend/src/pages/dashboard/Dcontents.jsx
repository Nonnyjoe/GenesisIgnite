import styles2 from "../../styles/dashboard2.module.css"
import styles from "../../styles/dashboard.module.css"
import ignitelogopure from "../../images/ignitelogopure.png"
import Link from 'next/link';
import rocketicon from "../../images/rocketicon.png"
import usericon from "../../images/usericon.png"
import rocket from "../../images/223.png"
import cylinder from "../../images/cylinder.png"
import Image from "next/image"
import { useAccount, useContractRead, Suspense, useContractReads, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import {LaunchPadFacoryAddr} from "../../utils/addresses";
import LPFactoryABI from "../../utils/LPFactory.json";
import {GeneAddress} from "../../utils/addresses"
import { useContext, useState } from "react";
import Launchpads from "./History";
import tokenABI from "../../utils/token_ABI.json"



export default function Dcontents(){


  //// WAGMI INTEGRATION TO CONNECT TO BLOCKCHAIN
const { address } = useAccount();
const addressFP = address?.slice(0,4);
const addressLP = address?.slice(-4);
const LaunchPadFactory = LaunchPadFacoryAddr();
const [UserBalance, setUserBalance] = useState();
const [LaunchPads, setLaunchPads] =  useState([]);
const [userAddress, setUserAddress] =  useState([]);




 /// FETCH USER DATA FROM THE CONTRACT 
  const { data: LPData, isError: ReadsError, isLoading: ReadsLoading } = useContractReads({
    contracts: [
      {
        address: GeneAddress(),
        abi: tokenABI,
        functionName: 'balanceOf',
        args:[address],
      },
       {address: LaunchPadFactory,
        abi: LPFactoryABI,
        functionName: 'displayUsersParticipation',
        args:[address],
      },
    ],
      watch: true,
      onSuccess: (data) => {
      setUserBalance(Math.floor(data[0]).toString());
      setLaunchPads((data[1])?.slice(-5));
        console.log(UserBalance);
        setUserAddress(`${(addressFP) ?? "0X00"}....${(addressLP) ?? "0000"}`)
  }})


    return(
        <div className={`${styles2.Dcontents} flex flex-col`}>
              <div className={styles.dashboardTop}>
                <div className={`${styles.dashcards} ${styles.dashcards1}`}>
                    <div className={styles.userTokenBal}>
                        <div className={styles.cardlogo}>
                            <Image src={ignitelogopure} />
                        </div>
                        <div className={`${styles.textleft} font-pop`}>
                            <p className="">TOKEN BALANCE</p>
                            <h4> {Math.floor((UserBalance) / 10**18)} GIT</h4>
                        </div> 
                    </div>
                        <p className={`${styles.demotopparagraph} text-sm`}>Active</p>
                    <hr />
                    <div className={styles.buyToken}>
                    <Link href={`./swapPad`}>
                        <p>Buy Token</p>
                    </Link>
                    </div>

                </div>
                <div className={styles.dashcards}>
                    <div className={styles.demotop}>
                        <div className={`${styles.flex} ${styles.demogap}`}>
                            <div className={styles.rocketlogo}>
                                <Image src={rocketicon}/>
                            </div>
                            <div className={`${styles.demodash} ${styles.textleft} font-pop`}>
                                <p>NFT BALANCE</p>
                                <h5>1 GIT NFT</h5>
                            </div>
                        </div>
                    </div>
                    <hr />
                 
                       <div>
                        <div className={`${styles.flex} ${styles.statgap} font-pop`}>
                            <div className={styles.userstats}>
                                <h5>{(LaunchPads?.length)??"0"}</h5>
                                <p>LaunchPads</p>
                            </div>
                            <div className={styles.userstats}>
                                <h5>000</h5>
                                <p>Presales</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.dashcards} ${styles.usercard}`}>
                    <div className={`${styles.flex} ${styles.demogap}`}>
                        <div className={styles.usericonimg}>
                            <Image src={usericon}/>
                        </div>
                        <div className="font-pop text-md">
                            <p className="font-pop">Your Account Status</p>
                            <h4 className="pt-2 font-pop">[{userAddress}]</h4>
                        </div>
                    </div>
                        <div className={`${styles.flex} ${styles.verifiedstats} font-pop text-sm pl-2`}>
                            <p className={styles.verfiedstats}>Project Admin</p>
                            <p className={styles.verfiedstats}>Email Verified</p>
                        </div>
                </div>
            </div>
            <div>
            <div className={styles.dashboardbottom}>
                <div className={`${styles.flex2} ${styles.dashboardcardsbtm}`}>
                    <div className="mb-[1.5rem]"> 
                        <p className="text-4xl ml-4 font-pop leading-[3rem]">Thank you for your interest in GENESIS IGNITE</p>
                    </div>
                <div className="flex">
                    <div className={`${styles.appreciation} text-md font-pop`}>
                        <p className="mb-3">You can Buy our token for transactions on the Buy Token page</p>
                        <p className="mb-3">You can get quick responses to any question and chat with the team on Discord &quot;Link here&quot;</p>
                        <p className="mb-5"> Don&apos;t hesistate to refer friends</p>
                    <div className={styles.buyToken2}>
                    <Link href={`https://github.com/Nonnyjoe/GenesisIgnite`}>
                        <p>Github</p>
                    </Link>
                    </div>
                    </div>
                    <div className={styles.bottomrocket}>
                        <Image src={rocket}/>
                    </div>
                </div>
                </div>
                <div className={styles.dashboardcardsbtm}>
                    <div className={styles.salesdetails}>
                        <div className={`${styles.flex} ${styles.salesprogress} font-pop flex justify-center items-center`}>
                            <h5>LaunchPad History</h5>
                        </div>
                            <hr />
                        <div className={`${styles.flex} ${styles.amountprogress} ${styles.flexColumn}`}>
                                {LaunchPads?.map((e, i) => {
                                return (
                                <div key={i} className={styles.full}>
                                    {/* // {e} */}
                                    <Launchpads key={i} contractAddress={e} />
                                </div>
                                )
                            })}

                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}
import {
  erc20ABI,
  useContractRead,
  useContractReads,
  useAccount,
  useContractWrite,
  useWaitForTransaction,
  wagmi,
} from "wagmi";
import plus from "../../images/plus.png";
import styles2 from "../../styles/launchpad.module.css"
import { useContext, useState, useEffect } from "react";
import {GENESISCONTROLLER} from "../../utils/addresses";
import controllerABI from "../../utils/controllerABI.json";
import { useRouter } from "next/router";
import LPABI from "../../utils/LPABI.json";
import tokenABI from "../../utils/token_ABI.json";
import { GeneAddress } from "../../utils/addresses";
import { ethers } from "ethers";
import Header from "../../components/header";
import styles from "../../styles/LaunchPads.module.css";
import Image from "next/image";
import igniteNft from "../../images/dodge.png";
import Proposal from "./Proposals/proposal";
import Link from "next/link";

const DaoAddresses = (props) => {
  const { address } = useAccount();
  const { contractAddress } = props;
  const geneAddress = GeneAddress();
  const [LaunchPadData, setLaunchPadData] = useState({});
  const [Amount, setAmount] = useState(0);

  const [LaunchPadDeadline, setLaunchPadDeadline] = useState(null);
  const [activateButton, setActivateButton] = useState(true);
  const [userAllowance, setUserAllowance] = useState();
  const [hovered, setHovered] = useState(false);
  const [cid, setCid] = useState();
  const [LaunchPadToken, setLaunchPadToken] = useState();
  const [ProposalIds, setProposalIds] = useState([]);


  /// FETCH THE CONTRACT TOKEN NAME AND SYMBOL
  const {
    data: BuyersData,
    isError,
    isLoading,
  } = useContractRead({
    address: GENESISCONTROLLER(),
    abi: controllerABI,
    functionName: "displayTokenDetails",
    args: [contractAddress],
    onSuccess(data) {
      setLaunchPadData(data);
    },
  });



  useContractRead({
    address: contractAddress,
    abi: LPABI,
    functionName: "viewLaunchPadToken",
    onSuccess(data) {
      setLaunchPadToken(data.toString());
    },
  });

    useContractRead({
    address: contractAddress,
    abi: LPABI,
    functionName: "getProposalIds",
    onSuccess(data) {
      setProposalIds(data);
      console.log(data + ' PROPOSAL IDS');
    },
  });

  useContractRead({
    address: GENESISCONTROLLER(),
    abi: controllerABI,
    functionName: "returnCid",
    args: [LaunchPadToken ?? "0x00"],
    onSuccess(data) {
      setCid(data.toString());
    },
  });




  const Timestamp = (data) => {
    const now = new Date();
    const epochTime = Math.floor(now.getTime() / 1000);
    console.log(`Current epoch time: ${epochTime}`);
    console.log(`Current END time: ${LaunchPadDeadline}`);
    if (epochTime > data) {
      setActivateButton[false];
      console.log("false");
    } else {
      setActivateButton[true];
      console.log("true");
    }
  };

  const Lstatus = () => {
    const now = new Date();
    const epochTime = Math.floor(now.getTime() / 1000);
    if (epochTime > LaunchPadDeadline) {
      return "ENDED";
    } else if (epochTime < LaunchPadDeadline) {
      setActivateButton[true];
      return "ACTIVE";
    }
  };

  const handleHover = (e) => {
    // logs the target element
    const now = new Date();
    const epochTime = Math.floor(now.getTime() / 1000);
    if (epochTime > LaunchPadDeadline) {
      setHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const epochTime2 = () => {
    const now = new Date();
    const epochTime = Math.floor(now.getTime() / 1000);
    return epochTime;
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log("user Allowance" + userAllowance);
    if (epochTime2() > LaunchPadDeadline) {
      getWithdraw?.();
    } else {
      if (userAllowance < Amount * 10 ** 18) {
        getAlawee?.();
      } else {
        getParticipate?.();
      }
    }
  }
  function handleSubmit2b() {
    getParticipate?.();
  }

  const epochTime = () => {
    const now = new Date();
    const epochTime = Math.floor(now.getTime() / 1000);
    if (epochTime > LaunchPadDeadline) {
      return false;
    } else {
      return true;
    }
  };

  const launchStatusClassName = epochTime()
    ? styles.launchongoing
    : styles.launchended;

  return (
    <div className={styles.LaunchpadWhite1}>
      <div className={styles.LaunchpadSecondWhite}>
        <div className={styles.Banner}></div>
        {/* <div className={styles.flexpage}> */}
          <div className={styles.dynamiclaunch}>
            <div
              className={`${styles.dynamicheader} font-pop flex-row-reverse flex gap-6 w-[100%] p-0 m-0 ${styles.uppercase}`}
            >
              <div className="w-[90%]">
                <div className={`${styles.flex1} justify-center items-center`}>
                  <p className={`${styles.launchpadname} font-pop `}>
                    {LaunchPadData.name} DAO PROPOSALS
                  </p>
                </div>
              </div>
              <div className="">
                {cid ? (
                  <div className={styles.tokenLogo}>
                    <img
                      src={`https://${cid}.ipfs.w3s.link/tokenLogo`}
                      alt="Dummy image"
                      width="100%"
                      height="100%"
                    />
                  </div>
                ) : (
                  <div className={styles.tokenLogo}>
                    <Image src={igniteNft} />
                  </div>
                )}
              </div>
            </div>
           
          <div className={`${styles.participate} mt-10 font-pop`}>

          <div className={`${styles2.topBar} flex flex-row `}>
            <Link href={`/dao/createProposal/${contractAddress}`}>
          <div className={`flex flex-row w-[14rem] h-[3.1rem] px-[rem] justify-center ml-auto gap-0 ${styles2.createBtn}`}>
            <div className="m-0 w-15 h-15">
              <Image src={plus} />
            </div>
            <button className={`h-[3rem] w-[12rem] font-pop text-sm`}> CREATE PROPOSAL </button>
          </div>
            </Link>
          </div>            
             <div className="mb-8 pl-4">
              <h1>List of available proposals, both active, complete and cancelled, Click to participate.</h1>
            </div>

            <div className="mt-5">              
              {ProposalIds?.map((e, i) => {
                return (
                  <div key={i} className="mb-5">
                      <Proposal key={i} ProposalId={e} index={i} contractAddress={contractAddress}/>
                  </div>
                );
              })}
            </div>
          </div>        
          </div>
      </div>
    </div>
  );
};

export default DaoAddresses;

import {
  erc20ABI,
  useContractRead,
  useContractReads,
  useAccount,
  useContractWrite,
  useWaitForTransaction,
  wagmi,
} from "wagmi";
import { useContext, useState, useEffect } from "react";
import LPFactoryABI from "../../utils/LPFactory.json";
import { useRouter } from "next/router";
import LPABI from "../../utils/LPABI.json";
import tokenABI from "../../utils/token_ABI.json";
import { LaunchPadFacoryAddr } from "../../utils/addresses";
import { GeneAddress } from "../../utils/addresses";
import { ethers } from "ethers";
import Header from "../../components/header";
import styles from "../../styles/LaunchPads.module.css";
import Image from "next/image";
import igniteNft from "../../images/dodge.png";


const LaunchPadDetails = (props) => {
  const { address } = useAccount();
const { contractAddress } = props;
  const DropdownOptions2 = [
    {
      id: 0,
      name: "GENE",
      address: "0x8717F0F7D4b06a52Aa2484b33DA1b6ea13519a6E",
    },
  ];
  const LaunchPadFactory = LaunchPadFacoryAddr();
  const geneAddress = GeneAddress();
  const [LaunchPadData, setLaunchPadData] = useState({});
  const [option, setOption] = useState("");
  const [Amount, setAmount] = useState(0);
  const [noOfLaunchPadContributors, setNoOfLaunchPadContributors] =
    useState(null);
  const [genesRaisedFromLaunchPad, setGenesRaisedFromLaunchPad] =
    useState(null);
  const [presaleTokenBalance, setPresaleTokenBalance] = useState(null);
  const [LaunchPadTotalSupply, setLaunchPadTotalSupply] = useState(null);
  const [LaunchPadDeadline, setLaunchPadDeadline] = useState(null);
  const [activateButton, setActivateButton] = useState(true);
  const [LPEndDate, setLPEndDate] = useState(null);
  const [genesDepositedByUser, setGenesDepositedByUser] = useState(null);
  const [userAllowance, setUserAllowance] = useState();
  const [UserBalance, setUserBalance] = useState();
  const [hovered, setHovered] = useState(false);
  const [cid, setCid] = useState();
  const [LaunchPadToken, setLaunchPadToken] = useState();
  const [priceIncrease, setPriceIncrease] = useState();


  /// FETCH THE CONTRACT TOKEN NAME AND SYMBOL
  const {
    data: BuyersData,
    isError,
    isLoading,
  } = useContractRead({
    address: LaunchPadFactory,
    abi: LPFactoryABI,
    functionName: "displayTokenDetails",
    args: [contractAddress],
    onSuccess(data) {
      setLaunchPadData(data);
    },
  });


  /// SET THE PRICE INCREASE:
 useContractRead({
    address: contractAddress,
    abi: LPABI,
    functionName: "PercentagePriceIncrease",
    onSuccess(data) {
      setPriceIncrease(data);
    },
  });


    useContractRead({
    address: contractAddress,
    abi: LPABI,
    functionName: "viewLaunchPadToken",
    onSuccess(data) {
      setLaunchPadToken((data).toString());
      console.log(data);
    },
  });

    useContractRead({
    address: LaunchPadFacoryAddr(),
    abi: LPFactoryABI,
    functionName: "returnCid",
    args:[LaunchPadToken??"0x00"],
    onSuccess(data) {
      setCid((data).toString());
      console.log(data);
    },
  });

  //// CHECK THE ALLOWANCE THE USER HAS GRANTED THE CONTRACT
  useContractRead({
    address: geneAddress,
    abi: tokenABI,
    functionName: "allowance",
    args: [address, contractAddress],
    watch: true,
    onSuccess(data) {
      setUserAllowance(Number(data));
    },
  });

  // GRANT ALLOWANCE
  const {
    data: alawee,
    write: getAlawee,
    isLoading: alaweeLoading,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: geneAddress,
    abi: tokenABI,
    functionName: "approve",
    args: [contractAddress, ethers.utils.parseEther(String(Amount) ?? "0")],
  });

  const { data: alaweeWaitData, isLoading: loadingAlaweeWaitData } =
    useWaitForTransaction({
      hash: alawee?.hash,
      onSuccess(result) {
        handleSubmit2b();
      },
      onError(error) {
        console.log("Error: ", error);
      },
    });


  /// MAIN INTEGRATION TO PARTICIPATE IN LAUNCHPAD
  const {
    data: participate,
    write: getParticipate,
    isLoading: participateLoading,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: contractAddress,
    abi: LPABI,
    functionName: "participateInLaunchPad",
    args: [ethers.utils.parseEther(String(Amount) ?? "0")],
  });

  const { data: participateWaitData, isLoading: loadingParticipateWaitData } =
    useWaitForTransaction({
      hash: participate?.hash,
      onSuccess(result) {},
      onError(error) {
        console.log("Error: ", error);
      },
    });


  /// WITHDRAW LAUNCHPAD REWARD
  const {
    data: withdraw,
    write: getWithdraw,
    isLoading: withdrawalLoading,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: contractAddress,
    abi: LPABI,
    functionName: "WithdrawLaunchPadToken",
  });

  const { data: withdrawWaitData, isLoading: loadingWithdrawWaitData } =
    useWaitForTransaction({
      hash: withdraw?.hash,
      onSuccess(result) {},
      onError(error) {
        console.log("Error: ", error);
      },
    });



  // function to read contract details from blockchain
  const {
    data: LPData,
    isError: ReadsError,
    isLoading: ReadsLoading,
  } = useContractReads({
    contracts: [
      {
        address: contractAddress,
        abi: LPABI,
        functionName: "displayNoOfLaunchPadContributors",
      },
      {
        address: contractAddress,
        abi: LPABI,
        functionName: "viewGenesRaisedFromLaunchPad",
      },
      {
        address: contractAddress,
        abi: LPABI,
        functionName: "viewPresaleTokenBalance",
      },
      {
        address: contractAddress,
        abi: LPABI,
        functionName: "getGenesDepositedByUser",
        args: [address],
      },
      {
        address: geneAddress,
        abi: tokenABI,
        functionName: "balanceOf",
        args: [address],
      },
      {
        address: contractAddress,
        abi: LPABI,
        functionName: "viewLaunchPadTSupply",
      },
      {
        address: contractAddress,
        abi: LPABI,
        functionName: "viewLaunchPadEndTime",
      },
    ],
    watch: true,
    onSuccess: (data) => {
      setNoOfLaunchPadContributors(data[0]?.toString());
      setGenesRaisedFromLaunchPad(data[1]?.toString());
      setPresaleTokenBalance(data[2]?.toString());
      setGenesDepositedByUser(data[3]?.toString());
      setUserBalance(data[4]?.toString());
      setLaunchPadTotalSupply(data[5]?.toString());
      setLaunchPadDeadline(data[6]?.toString());
      setLPEndDate(new Date(data[6] * 1000));
      Timestamp(data[6]);
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
    if(epochTime2() > LaunchPadDeadline) {
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
  
  const launchStatusClassName = epochTime() ? styles.launchongoing : styles.launchended;

  return (
    <div className={styles.LaunchpadWhite1}>
    <div className={styles.LaunchpadSecondWhite}>
      <div className={styles.Banner}></div>
      <div className={styles.flexpage}>
        <div className={styles.dynamiclaunch}>
          <div className={`${styles.dynamicheader} flex-row-reverse flex gap-6 w-[100%] p-0 m-0 ${styles.uppercase}`}>
            <div className="w-[75%]">
            <div className={styles.flex1}>
              <p className={`${styles.launchpadname} font-pop`}>{LaunchPadData.name}</p>
            </div>
            <div className="flex justify-between flex-row">
            <p className={`${styles.launchpadsymbol} font-pop`}>{LaunchPadData.symbol}</p>
            <p className={`${launchStatusClassName} font-pop`}>{Lstatus()}</p>
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
          <div className="flex flex-col gap-6 h-[100%]">
            <div className={`${styles.generaldetails} font-pop text-center justify-center align-middle flex mt-6`}>
              <div>
                <h5 class="mt-6 font-pop">
                  CONTRIBUTORS:{" "}
                  <span className={styles.launcpdetailed}>
                    {noOfLaunchPadContributors}
                  </span>{" "}
                </h5>
              </div>
              <div>
                <h5 class="mt-4 font-pop">
                  Total Supply:{" "}
                  <span className={styles.launcpdetailed}>
                    {Math.floor(LaunchPadTotalSupply / 10 ** 18)} {LaunchPadData.symbol}{" "}
                  </span>
                </h5>
              </div>
              <div>
                <h5 class="mt-4 font-pop">
                  GIT RAISED : {" "}
                  <span className={styles.launcpdetailed}>
                    {Math.floor(genesRaisedFromLaunchPad / 10 ** 18)} GIT
                  </span>
                </h5>
              </div>
            </div>

          <div className={`${styles.moreDetails}`}>
            <div className="mt-10">
              <h5 class="mt-4 font-pop">
                GIT depositd by user:{" "}
                <p>{genesDepositedByUser / 10 ** 18} GIT</p>
              </h5>
            </div>
          <div className="">
            <div className="">
              <h5 class="mt-4 font-pop">Token presale budget: </h5>
              <p>
                {Math.floor(presaleTokenBalance / 10 ** 18)} {LaunchPadData.symbol}
              </p>
            </div>

            <div className="">
              <h5 class="mt-4 font-pop">
               Price increase after Launchpad:{" "}
              </h5>
              <p>{`${priceIncrease} %`}</p>
            </div>
          </div>
              <div className="">
              <h5 class="mt-4 font-pop">
                Launchpad contract address:{" "}
              </h5>
              <p>{contractAddress}</p>
            </div>
          </div>
          </div>

        </div>
        <div className={styles.leftside}>
          <div className={`${styles.launchendtime} font-pop mb-6`}>
            <h5 class="">LAUNCHPAD END TIME: </h5>
            <p className="font-pop">{LPEndDate?.toLocaleString()}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={`${styles.participate} mb-6`}>
              <h5 className={`${styles.participationheader} font-pop`}>PARTICIPATE</h5>
              <p className={`${styles.participationparagraph} text-base`}>
                {" "}
                <span className="uppercase">Requirement : </span> To participate, you need GIT Token{" "}
              </p>

              <div className={`${styles.pl2} mt-9 font-pop w-[100%]`}>
              
                <p className="mb-7">
                  Your GIT BALANCE: {UserBalance / 10 ** 18} GIT
                </p>
                
                <input
                  id="string"
                  type="Number"
                  placeholder="0.00"
                  className={styles.amountbar}
                  onChange={(e) => {
                    setAmount(Number(e.target.value));
                    console.log(Amount);
                  }}
                />
                <br />
              <div className="flex flex-row gap-5 ml-[-1rem]">
                { epochTime2() > LaunchPadDeadline ?  
                <button
                  type="submit"
                  onMouseEnter={handleHover}
                  onMouseLeave={handleMouseLeave}
                  className={`${styles.launchpadbtn} font-pop text-sm`}
                  disabled={
                    withdrawalLoading ||
                    alaweeLoading ||
                    loadingAlaweeWaitData ||
                    participateLoading ||
                    loadingParticipateWaitData
                  }
                >
                  {loadingWithdrawWaitData || withdrawalLoading ? ".....Processing" : "Withdraw Reward"}
                </button> : 
                 <button
                  type="submit"
                  onMouseEnter={handleHover}
                  onMouseLeave={handleMouseLeave}
                  className={`${styles.launchpadbtn} font-pop text-sm`}
                  disabled={
                    alaweeLoading ||
                    loadingAlaweeWaitData ||
                    participateLoading ||
                    loadingParticipateWaitData
                  }
                >
                  {epochTime2() > LaunchPadDeadline
                    ? "Launchpad Ended"
                    : userAllowance < Amount * 10 ** 18
                    ? "APPROVE"
                    : hovered
                    ? " Launchpad Ended"
                    : alaweeLoading ||
                      loadingAlaweeWaitData ||
                      participateLoading ||
                      loadingParticipateWaitData
                    ? "LOADING...."
                    : "PARTICIPATE"}
                </button>   
                                }
               
              </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
};

export default LaunchPadDetails;

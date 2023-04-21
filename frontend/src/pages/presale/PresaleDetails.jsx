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
import dodge from "../../images/dodge.png";

const PresaleDetails = (props) => {
   const { contractAddress } = props;
    const {address} = useAccount();
  const [LaunchPadData, setLaunchPadData] = useState({});
        const geneAddress = GeneAddress();
  const [noOfLaunchPadContributors, setNoOfLaunchPadContributors] =
    useState(null);
  const [genesRaisedFromLaunchPad, setGenesRaisedFromLaunchPad] =
    useState(null);
  const [LaunchPadTotalSupply, setLaunchPadTotalSupply] = useState(null);
  const [activateButton, setActivateButton] = useState(true);
  const [LPEndDate, setLPEndDate] = useState(null);
  const [genesDepositedByUser, setGenesDepositedByUser] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("user Allowance" + userAllowance);
    if (userAllowance < Amount * 10 ** 18) {
      getAlawee?.();
    } else {
      getParticipate?.();
    }
  }
  function handleSubmit2b() {
    getParticipate?.();
  }

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

















    const {
    data: LPData2,
    isError: ReadsError2,
    isLoading: ReadsLoading2,
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
      setLPEndDate(new Date(data[6] * 1000));
      console.log(noOfLaunchPadContributors);
    },
  });


















  
  
    const LaunchPadFactory = LaunchPadFacoryAddr();
    const [PresalePadData, setPresaleData] = useState({});
    const [Amount, setAmount] = useState(0);
    const [userAllowance, setUserAllowance] = useState( );
    const [hovered, setHovered] = useState(false);
    const [TokenPrice, setTokenPrice] = useState();
    const [GenesRaisedFromPresale, setGenesRaisedFromPresale] = useState();
    const [PresaleTokenBalance, setPresaleTokenBalance] = useState();
    const [UserBalance, setUserBalance] = useState();
    const [UserPTBalance, setUserPTBalance] = useState();
    const [PTAddress, setPTAddress] = useState();



  /// FETCH THE CONTRACT TOKEN NAME AND SYMBOL
    const { data:BuyersData, isError, isLoading } = useContractRead({
    address: LaunchPadFactory,
    abi: LPFactoryABI,
    functionName: 'displayTokenDetails',
    args:[contractAddress],
    onSuccess(data){
    setLaunchPadData(data);
    }
  })

    //// CHECK THE ALLOWANCE THE USER HAS GRANTED THE CONTRACT
    useContractRead({
        address: geneAddress,
        abi: tokenABI,
        functionName: 'allowance',
        args: [address, contractAddress],
        watch: true,
        onSuccess(data) {
            setUserAllowance(Number(data))
        }
    })

    /// APROVE THE CONTRACT TO SPEND THE USER TOKENS
    const { data: alawee, write: getAlawee, isLoading:alaweeLoading } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: geneAddress,
    abi: tokenABI,
    functionName: "approve",
    args: [contractAddress, ethers.utils.parseEther(String(Amount)?? "0")],
  });

    const { data: alaweeWaitData, isLoading:loadingAlaweeWaitData } = useWaitForTransaction({
    hash: alawee?.hash,
    onSuccess(result) {
     handleSubmit2b();
    },
    onError(error) {
      console.log("Error: ", error);
    },
  })



    /// MAIN INTEGRATION TO PARTICIPATE IN PRESALES
  const { data: participate, write: getParticipate, isLoading: participateLoading } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: contractAddress,
    abi: LPABI,
    functionName: "participateInPresale",
    args: [ethers.utils.parseEther(String(Amount)?? "0")],
  });
    const { data: participateWaitData, isLoading:loadingParticipateWaitData } = useWaitForTransaction({
    hash: participate?.hash,
    onSuccess(result) {
    },
    onError(error) {
      console.log("Error: ", error);
    },
  })

  /// FETCH PRESALEDATA FROM THE CONTRACT 
  const { data: LPData, isError: ReadsError, isLoading: ReadsLoading } = useContractReads({
    contracts: [
      {
        address: contractAddress,
        abi: LPABI,
        functionName: 'DisplayRateFromLaunchPad',
      },
      {
        address: contractAddress,
        abi: LPABI,
        functionName: 'viewGenesRaisedFromPreSale',
      },
      {
        address: contractAddress,
        abi: LPABI,
        functionName: 'viewPresaleTokenBalance',
      },
      {
        address: geneAddress,
        abi: tokenABI,
        functionName: 'balanceOf',
        args:[address],
      },
       {address: contractAddress,
        abi: LPABI,
        functionName: 'viewLaunchPadToken',
      },
    ],
      watch: true,
      onSuccess: (data) => {
      setTokenPrice((data[0])?.toString());
      setGenesRaisedFromPresale((data[1])?.toString());
      setPresaleTokenBalance((data[2]?.toString()));
      setUserBalance((data[3])?.toString());
      setPTAddress((data[4])?.toString());

  }})

    //// CHECK THE USERS PRESALE TOKEN BALANCE
    useContractRead({
        address: PTAddress,
        abi: tokenABI,
        functionName: 'balanceOf',
        args: [address],
        watch: true,
        onSuccess(data) {
            setUserPTBalance(Number(data))
        }
    })

      /// HANDLE FORM SUBMIT EVENT TO DETERMINE IF TO GRANT ALLOWANCE OR TO CALL CONTRACT DIRECTLY
    function handleSubmit(e) {
    e.preventDefault();
    console.log("user Allowance"+ userAllowance)
    if(userAllowance < (Amount * 10**18)){
      getAlawee?.();
    }else {
      getParticipate?.();
    }

  }
  function handleSubmit2b(){
    getParticipate?.();
  }


    // Handle the mouse Over Effect of the buttons
      const handleHover = (e) => {// logs the target element
        //   const now = new Date();
        //   const epochTime = Math.floor(now.getTime() / 1000);
        // if (epochTime > LaunchPadDeadline){
          setHovered(true);
        // }
      };

      const handleMouseLeave = () => {
        setHovered(false);
      };























  return (
    <div className={styles.LaunchpadWhite}>
    <div className={styles.LaunchpadSecondWhite}>
      <div className={styles.Banner}></div>
      <div className={styles.flexpage}>
        <div className={styles.dynamiclaunch}>
          <div className={`${styles.dynamicheader} flex-row-reverse flex gap-6 w-[100%] p-0 m-0 ${styles.uppercase}`}>
            <div className="w-[75%]">
            <div className={styles.flex1}>
              <p className={`${styles.launchpadname} font-EudoxusSansBold`}>{LaunchPadData.name}</p>
            </div>
            <div className="flex justify-between flex-row">
            <p className={`${styles.launchpadsymbol} font-pop`}>{LaunchPadData.symbol}</p>
            <p className={`${styles.launchended} font-pop`}>{`active`}</p>
            </div>
          </div>
            <div className="">
                <div className={`${styles.tokenLogo}`}>
                  <Image src={dodge} />
                </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 h-[100%]">
            <div className={`${styles.generaldetails} font-pop text-center justify-center align-middle flex mt-6`}>
              <div>
                <h5 class="mt-6 font-pop">
                  <span className={styles.launcpdetailed}>
                  {LaunchPadData.symbol} BALANCE:{" "} <br />
                    {Math.floor(UserPTBalance / 10 ** 18)} {LaunchPadData.symbol}
                  </span>{" "}
                </h5>
              </div>
              <div>
                <h5 class="mt-4 font-pop">
                  AVAILABLE SUPPLY:{" "} <br/>
                  <span className={styles.launcpdetailed}>
                    {Math.floor(PresaleTokenBalance / 10 ** 18)} {LaunchPadData.symbol}{" "}
                  </span>
                </h5>
              </div>
              <div>
                <h5 class="mt-4 font-pop">
                  TOTAL GIT RAISED : {" "} <br/>
                  <span className={styles.launcpdetailed}>
                    {GenesRaisedFromPresale / 10 ** 18} GIT
                  </span>
                </h5>
              </div>
            </div>

          <div className={`${styles.moreDetails}`}>
            <div className="mt-10">
              <h5 class="mt-4 font-pop">
                TOTAL LAUNCHPAD CONTRIBUTORS:{" "}
                <span>{noOfLaunchPadContributors}</span>
              </h5>
            </div>
          <div className="">
            <div className="">
              <h5 class="mt-4 font-pop">TOKEN LAUNCHPAD COMPLETED BUDGET: </h5>
              <p>
                {Math.floor(LaunchPadTotalSupply / 10 ** 18)} {LaunchPadData.symbol}
              </p>
            </div>

            <div className="">
              <h5 class="mt-4 font-pop">
                PERCENTAGE PRICE INCREASE AFTER LAUNCHPAD:{" "}
              </h5>
              <p>{`100%`}</p>
            </div>
          </div>
              <div className="">
              <h5 class="mt-4 font-pop">
                LAUNCHPAD CONTRACT ADDRESS:{" "}
              </h5>
              <p>{contractAddress}</p>
            </div>
          </div>
          </div>

          {/* <!-- <p>{`${contractAddress.slice(0, 4)}...${contractAddress.slice(-4)}`}</p> -->
            <!-- <p>{ cardData[2] } </p> --> */}
        </div>
        <div className={styles.leftside}>
          <div className={`${styles.launchendtime} font-pop mb-6`}>
            <h5 class="">TOKEN EXCHANGE RATE: </h5>
            <p className="">{`1 GIT == ${TokenPrice / (10**18)} ${LaunchPadData.symbol}`}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={`${styles.participate} mb-6`}>
              <h5 className={`${styles.participationheader} font-EudoxusSansBold`}>PARTICIPATE</h5>
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
                  type="Any"
                  placeholder="0.00"
                  className={styles.amountbar}
                  onChange={(e) => {
                    setAmount(Number(e.target.value));
                    console.log(Amount);
                  }}
                />
                <br />
                <button
                  type="submit"
                  onMouseEnter={handleHover}
                  onMouseLeave={handleMouseLeave}
                  className={styles.launchpadbtn}
                  disabled={ alaweeLoading || loadingAlaweeWaitData || participateLoading || loadingParticipateWaitData}
                >
             { (userAllowance < (Amount * 10**18)) ? "APPROVE" : hovered ? " LAUNCHPAD ENDED" : alaweeLoading || loadingAlaweeWaitData || participateLoading || loadingParticipateWaitData ? "LOADING...." : "PARTICIPATE"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
};

export default PresaleDetails;

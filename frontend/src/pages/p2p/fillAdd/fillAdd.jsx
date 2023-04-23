import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import tokenABI from "../../../utils/token_ABI.json";
import {
  erc20ABI,
  useContractRead,
  useContractReads,
  useAccount,
  useContractWrite,
  useWaitForTransaction,
  wagmi,
} from "wagmi";
// import EscrowAbi from "../../../Utils/EscrowAbi.json";
import EscrowAbi from "../../../utils/EscrowAbi.json";
import styles from "../../../styles/p2p.module.css"
import styles2 from "../../../styles/LaunchPads.module.css";
import Tilt from 'react-parallax-tilt';
import {Swapp} from "../../../utils/addresses";
import {EthClasic} from "../../../utils/addresses";
import {Arbitrum} from "../../../utils/addresses";
import {Shiba} from "../../../utils/addresses";
import {GenesisigniteTokenAddr} from "../../../utils/addresses";


// import Select, { SelectChangeEvent } from "@mui/material/Select";
const FillOrder = (props) => {
  const {escrowId, Tstatus} = props;
  const {address} = useAccount();
  const [tokenAddress, setAddrs] = React.useState("");
  const [amount, setAmt] = React.useState(0);
  const [EscrowID, setID] = React.useState(0);
  const [buyAdds, setAds] = React.useState();
  const [UserAllowanceGIT, setUserAllowanceGIT] = React.useState();
  const [UserAllowanceETC, setUserAllowanceETC] = React.useState();
  const [UserAllowanceSHIB, setUserAllowanceSHIB] = React.useState();
  const [UserAllowanceARB, setUserAllowanceARB] = React.useState();


      //// CHECK THE ALLOWANCE THE USER HAS GRANTED THE CONTRACT
    useContractRead({
        address: GenesisigniteTokenAddr(),
        abi: tokenABI,
        functionName: 'allowance',
        args: [address, Swapp()],
        watch: true,
        onSuccess(data) {
            setUserAllowanceGIT(Number(data))
        }
    })

        useContractRead({
        address: EthClasic(),
        abi: tokenABI,
        functionName: 'allowance',
        args: [address, Swapp()],
        watch: true,
        onSuccess(data) {
            setUserAllowanceETC(Number(data))
        }
    })

        useContractRead({
        address:Shiba(),
        abi: tokenABI,
        functionName: 'allowance',
        args: [address, Swapp()],
        watch: true,
        onSuccess(data) {
            setUserAllowanceSHIB(Number(data))
        }
    })

        useContractRead({
        address: Arbitrum(),
        abi: tokenABI,
        functionName: 'allowance',
        args: [address, Swapp()],
        watch: true,
        onSuccess(data) {
            setUserAllowanceARB(Number(data))
        }
    })



      /// APROVE THE CONTRACT TO SPEND THE USER TOKENS
    const { data: alawee, write: getAlawee, isLoading:alaweeLoading } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: GenesisigniteTokenAddr(),
    abi: tokenABI,
    functionName: "approve",
    args: [Swapp(), ethers.utils.parseEther(amount ? String(amount) : "0")],
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

      /// APROVE THE CONTRACT TO SPEND THE USER TOKENS
    const { data: alaweeSHIB, write: getAlaweeShib, isLoading:alaweeLoading2 } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: Shiba(),
    abi: tokenABI,
    functionName: "approve",
    args: [Swapp(), ethers.utils.parseEther(amount ? String(amount) : "0")],
  });

    const { data: alaweeWaitData2, isLoading:loadingAlaweeWaitData2 } = useWaitForTransaction({
    hash: alaweeSHIB?.hash,
    onSuccess(result) {
     handleSubmit2b();
    },
    onError(error) {
      console.log("Error: ", error);
    },
  })

      /// APROVE THE CONTRACT TO SPEND THE USER TOKENS
    const { data: alaweeARB, write: getAlaweeARB, isLoading:alaweeLoading3 } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: Arbitrum(),
    abi: tokenABI,
    functionName: "approve",
    args: [Swapp(), ethers.utils.parseEther(amount ? String(amount) : "0")],
  });

    const { data: alaweeWaitData3, isLoading:loadingAlaweeWaitData3 } = useWaitForTransaction({
    hash: alaweeARB?.hash,
    onSuccess(result) {
     handleSubmit2b();
    },
    onError(error) {
      console.log("Error: ", error);
    },
  })


    /// APROVE THE CONTRACT TO SPEND THE USER TOKENS
    const { data: alaweeETC, write: getAlaweeETC, isLoading:alaweeLoading4 } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: EthClasic(),
    abi: tokenABI,
    functionName: "approve",
    args: [Swapp(), ethers.utils.parseEther(amount ? String(amount) : "0")],
  });

    const { data: alaweeWaitData4, isLoading:loadingAlaweeWaitData4 } = useWaitForTransaction({
    hash: alaweeETC?.hash,
    onSuccess(result) {
     handleSubmit2b();
    },
    onError(error) {
      console.log("Error: ", error);
    },
  })

    /// FILL BUY ADDS
    const { data: fillBuyAddData, write: startFillBuyAddData, isLoading:fillBuyAddIsLoading } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: Swapp(),
    abi: EscrowAbi,
    functionName: "fillBuyAdd",
    args: [ethers.utils.parseEther(amount ? String(amount) : "0"), escrowId],
  });

    const { data: fillBuyAddData2, isLoading:fillBuyAddIsLoading2 } = useWaitForTransaction({
    hash: fillBuyAddData?.hash,
    onSuccess(result) {
     handleSubmit2b();
    },
    onError(error) {
      console.log("Error: ", error);
    },
  })

    /// FILL SELL ADDS
    const { data: fillSellAddData, write: startFillSellAddData, isLoading:fillSellAddIsLoading } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: Swapp(),
    abi: EscrowAbi,
    functionName: "fillSellAdd",
    args: [ethers.utils.parseEther(amount ? String(amount) : "0"), escrowId],
  });

    const { data: fillSellAddData2, isLoading:fillSellAddIsLoading2 } = useWaitForTransaction({
    hash: fillSellAddData?.hash,
    onSuccess(result) {
     handleSubmit2b();
    },
    onError(error) {
      console.log("Error: ", error);
    },
  })


  // FUNCTION TO HANDLE CALLING OF THE FILL ESCROW IN BUTTON
  function handleSubmit(e) {
    e.preventDefault();
    if(Tstatus == "false"){
        if(Escrowdata[1] == Arbitrum()) {
            if(UserAllowanceARB < amount){
              getAlaweeARB?.()
            } else {
              handleSubmit2b();
            }
        } else if(Escrowdata[1] == EthClasic()){
            if(UserAllowanceETC < amount) {
              getAlaweeETC?.()
            } else {
                handleSubmit2b();
            }
        } else if(Escrowdata[1] == Shiba()){
            if(UserAllowanceSHIB < amount) {
              getAlaweeShib?.()
            } else {
                handleSubmit2b();
            }
      }
    } else if(Tstatus == "true") {
        getAlawee?.();
    }
}

function handleSubmit2b() {
      if(Tstatus == "true") {
        startFillBuyAddData?.();
      } else if (Tstatus == "false") {
        startFillSellAddData?.();
      }
}



  // functions //
  const setEscrowId = (event) => {
    setID(event.target.value);
  };

  const setAmount = (event) => {
    setAmt(event.target.value);
  };

  const setAddress = (event) => {
    setAddrs(event.target.value);
  };


  const [Escrowdata, setEscrowdata] = useState({});
  const [EscrowToken, setEscrowToken] = useState();

  const {
    data: EscrowDetails,
    isError: isErrorEscrowDetails,
    isLoading: isLoadingEscrowDetails,
  } = useContractRead({
    address: Swapp(),
    abi: EscrowAbi,
    functionName: "escrowDetails",
    args: [(escrowId)?.toString()],
    onSuccess: (data) => {
      console.log("Success", EscrowDetails);
      setEscrowdata(data);
      console.log(data);
      console.log(Tstatus);
      Escrowdata[1] == EthClasic()
                  ? setEscrowToken("EthClassic")
                  : Escrowdata[1] == Arbitrum()
                  ? setEscrowToken("Arbitrum")
                  : Escrowdata[1] == Shiba()
                  ? setEscrowToken("Shiba")
                  : setEscrowToken("Tokens")
    },
  });

  return (
    <div className={`${styles.launchpad} flex flex-row items-center justify-evenly gap-8 `}>
      <Tilt>

      <div className={`${styles.card3}`}>
        <p className={`${styles.cardTitle} font-pop text-3xl`}> FILL AD #{escrowId}</p>

        <div className={`${styles.cardContainer}`}>
          <p className={`${styles.cardContent} font-pop`}> <span className="text-md font-headers mr-10">Token:</span>  {`${ Escrowdata[1] == EthClasic()
                  ? "ETC"
                  : Escrowdata[1] == Arbitrum()
                  ? "ARB"
                  : Escrowdata[1] == Shiba()
                  ? "SHIB"
                  : " " }`} 
                  </p> 

          <p className={`${styles.cardContent} font-pop`}> <span className="text-md font-headers mr-10">Rate:</span>{`1 GIT = ${(Escrowdata.rate)?.toString()} ${ Escrowdata[1] == EthClasic()
                  ? "ETC"
                  : Escrowdata[1] == Arbitrum()
                  ? "ARB"
                  : Escrowdata[1] == Shiba()
                  ? "SHIB"
                  : " " }`}</p> 
          <p className={`${styles.cardContent} font-pop`}> <span className="text-md font-headers mr-10">Order Type:</span>{(Tstatus) == "true" ? 'BUY ADD' : 'SELL ADD'} </p> 
          <p className={`${styles.cardContent} font-pop`}> <span className="text-md font-headers mr-10">Created By:</span>{Escrowdata.proposer} </p> 
          <p className={`${styles.cardContent} font-pop`}> <span className="text-md font-headers mr-10">Available:</span>{(Escrowdata.expectedExchangeAmount / 10**18).toFixed(2)}</p> 
        </div>
      <form onSubmit={handleSubmit} className={`flex flex-col justify-center items-center p-5 mt-0 h-auto`}>
        <div className="flex flex-col gap-3">
          <div className="w-20">
            <label>Amount: </label>
            <br />
          </div>
          <div>
            <input
              className={styles2.amountbar}
              type="Number"
              value={amount}
              onChange={setAmount}
            />
          </div>
        </div>
        <div>
          <button
            className={`${styles2.launchpadbtn}`}
            type="submit"
          >
            {alaweeLoading || loadingAlaweeWaitData || alaweeLoading2 || loadingAlaweeWaitData2 || alaweeLoading3 || loadingAlaweeWaitData3 || alaweeLoading4 || loadingAlaweeWaitData4 || fillBuyAddIsLoading || fillBuyAddIsLoading2 || fillSellAddIsLoading || fillSellAddIsLoading2 ? `LOADING ........` :   `Fill Ad`}
          </button>
        </div>
      </form>
      </div>
      </Tilt>
    
    </div>
  );
};

export default FillOrder;

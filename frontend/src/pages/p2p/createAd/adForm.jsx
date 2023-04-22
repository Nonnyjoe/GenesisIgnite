import React from "react";
import { ethers } from "ethers";
import { useState } from "react";
import {
  useContractRead,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import {Swapp} from "../../../utils/addresses";
import {EthClasic} from "../../../utils/addresses";
import {Arbitrum} from "../../../utils/addresses";
import {Shiba} from "../../../utils/addresses";
import {GenesisigniteTokenAddr} from "../../../utils/addresses";
import EscrowAbi from "../../../utils/EscrowAbi.json";
import tokenABI from "../../../utils/token_ABI.json";
import styles2 from "../../../styles/LaunchPads.module.css";

const AdForm = (props) => {
    const { contractAddress, anotherProp } = props;
  const [allowanceValue, setAllowance] = React.useState( );
  const [tokenAddr, setAddress] = React.useState("");
  const [amount, setAmount] = React.useState( );
  const [rate, setRate] = React.useState( );
  const {
    address: User,
    isConnecting: userIsConnecting,
    isDisconnected: userIsDisconnected,
  } = useAccount();
    const [UserAllowanceGIT, setUserAllowanceGIT] = React.useState();
  const [UserAllowanceETC, setUserAllowanceETC] = React.useState();
  const [UserAllowanceSHIB, setUserAllowanceSHIB] = React.useState();
  const [UserAllowanceARB, setUserAllowanceARB] = React.useState();
  const {address} = useAccount();


 


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




  function handleSubmit(e) {
    e.preventDefault();
    console.log(`clicked submit`)
    console.log(anotherProp)
    console.log(contractAddress)
    console.log(Shiba())
    if ((anotherProp).toString() == "true") {
        if((contractAddress).toString() == Arbitrum()) {
            console.log(UserAllowanceARB);
            if(UserAllowanceARB < amount){
                console.log(`pass`);
              getAlaweeARB?.()
            } else {
                console.log(`fail`);
              handleSubmit2b();
            }
        } else if((contractAddress).toString() == EthClasic()){
            if(UserAllowanceETC < amount) {
              getAlaweeETC?.()
            } else {
                handleSubmit2b();
            }
        } else if((contractAddress).toString() == Shiba()){
            if(UserAllowanceSHIB < amount) {
              getAlaweeShib?.()
            } else {
                handleSubmit2b();
            }
      }
    } else if ((anotherProp).toString() == "false") {
            getAlawee?.()

    }
  }


      /// place sell ADDS
    const { data: placeSellAddData, write: startPlaceSellAdd, isLoading:placeSellAddLoading } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: Swapp(),
    abi: EscrowAbi,
    functionName: "placeSellAdd",
     args: [
      contractAddress,
      ethers.utils.parseEther(amount ? String(amount) : "0"),
      rate,
    ],
  });

    const { data: placeSellAddDataWait, isLoading:placeSellAddLoading2 } = useWaitForTransaction({
    hash: placeSellAddData?.hash,
    onSuccess(result) {

    },
    onError(error) {
      console.log("Error: ", error);
    },
  })


        /// place BUY ADDS
    const { data: placeBuyAddData, write: startPlaceBuyAdd, isLoading:placeBuyAddLoading } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: Swapp(),
    abi: EscrowAbi,
    functionName: "placeBuyAdd",
     args: [
      contractAddress,
      ethers.utils.parseEther(amount ? String(amount) : "0"),
      rate,
    ],
  });

    const { data: placeBuyAddDataWait, isLoading:placeBuyAddLoading2 } = useWaitForTransaction({
    hash: placeBuyAddData?.hash,
    onSuccess(result) {

    },
    onError(error) {
      console.log("Error: ", error);
    },
  })



                
function handleSubmit2b() {
    console.log(`called`);
    if((anotherProp).toString() == "true") {
        startPlaceBuyAdd?.();
      } else if ((anotherProp).toString() == "false") {
        startPlaceSellAdd?.();
      }
}



  // Function //
  const setAddr = (event) => {
    setAddress(event.target.value);
  };

  const setAmt = (event) => {
    setAmount(event.target.value);
  };

  const setRates = (event) => {
    setRate(event.target.value);
  };




  const getName =()=> {
    {console.log(contractAddress)}
    contractAddress == EthClasic() ? 'ETH CLASSIC' : contractAddress == Arbitrum() ? "ARBITRUM" : contractAddress == Shiba() ? "SHIBA" : null
  }

  return (
      <div className="font-pop mt-[-2rem] flex text-center w-auto justify-center">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-3">
            <div className=" pl-7">
                <p className="mb-4 font-pop text-xl"> TOKEN NAME: {contractAddress == EthClasic() ? 'ETH CLASSIC' : contractAddress == Arbitrum() ? "ARBITRUM" : contractAddress == Shiba() ? "SHIBA" : null} </p>
                <p className="font-pop text-xl mb-4"> ESCROW POSITION: {anotherProp == 'true' ? `BUY AD` : anotherProp == false ? `SELL AD` : 'BUY AD'}</p>

            </div>
          </div>
          <div className="flex gap-3 py-2">
            <div>
              <input
                className={styles2.amountbar}
                type="Number"
                value={amount}
                onChange={setAmt}
                placeholder='AMOUNT'
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 py-2">
            <input
              className={styles2.amountbar}
              type="Number"
              placeholder="RATE"
              value={rate}
              onChange={setRates}
            />
          </div>
          <div>
            <button
              className={`${styles2.launchpadbtn}`}
              type="submit"
                >
              {alaweeLoading || loadingAlaweeWaitData || alaweeLoading2 || loadingAlaweeWaitData2 || alaweeLoading3 || loadingAlaweeWaitData3 || alaweeLoading4 || loadingAlaweeWaitData4 || placeBuyAddLoading || placeBuyAddLoading2 || placeSellAddLoading || placeSellAddLoading2 ? `LOADING ........` :   `CREATE AD`}
            </button>
          </div>
        </form>
      </div>
  );
};

export default AdForm;

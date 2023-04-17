import Head from "next/head";
import PageLayout from "../layout/PageLayout";
import { useAccount, useContractRead, useContractReads, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import swapABI from "../utils/swap_ABI.json"
import { ethers } from "ethers";
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { stringify } from "querystring";
import tokenABI from "../utils/token_ABI.json"
import {swapPadAddr} from "../utils/addresses";
import {DaiAddress} from "../utils/addresses";
import {UsdcAddr} from "../utils/addresses";
import {GeneAddress} from "../utils/addresses";

export default function SwappIn() {
const { address } = useAccount()
const swapAddress = swapPadAddr();
const daiAddress = DaiAddress();
const usdcAddress = UsdcAddr();
const [option, setOption] = useState("");
const [Amount, setAmount] = useState(0);
const [userUsdcAllowance, setUserUsdcAllowance] = useState( );
const [userDaiAllowance, setUserDaiAllowance] = useState( );

    // CHECK ALLOWANCE THE USER HAS GRANTED
    useContractRead({
        address: daiAddress,
        abi: tokenABI,
        functionName: 'allowance',
        args: [address, swapAddress],
        watch: true,
        onSuccess(data) {
            setUserDaiAllowance(Number(data))
        }
    })

    useContractRead({
        address: usdcAddress,
        abi: tokenABI,
        functionName: 'allowance',
        args: [address, swapAddress],
        watch: true,
        onSuccess(data) {
            setUserUsdcAllowance(Number(data))
        }
    })

        // GRANT ALLOWANCE
    const { data: UsdcAlawee, write: getUsdcAlawee, isLoading:UsdcAlaweeLoading } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: usdcAddress,
    abi: tokenABI,
    functionName: "approve",
    args: [swapAddress, ethers.utils.parseEther(String(Amount)?? "0")],

  });

   const { data: UsdcAlaweeWaitData, isLoading:loadingUsdcAlaweeWaitData } = useWaitForTransaction({
    hash: UsdcAlawee?.hash,
    onSuccess(result) {
     handleSubmit2b();
    },
    onError(error) {
      console.log("Error: ", error);
    },
  })
        // GRANT ALLOWANCE
    const { data: alawee, write: getDaiAlawee, isLoading:alaweeLoading } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: daiAddress,
    abi: tokenABI,
    functionName: "approve",
    args: [swapAddress, ethers.utils.parseEther(String(Amount)?? "0")],

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

  // HANDLE CHANGES IN THE SWAPIN DROPDOWN MENU
  const handleOptionChange = async (event) => {
    // setOption(0)
    const hello = event.target.value;
    setOption(hello);
  };

function handleSubmit2b() {
    if(option == DropdownOptions[0].address){
      swapEthToGene?.();
    } else if (option == DropdownOptions[1].address) {
      swapDaiToGene?.();
    } else if (option == DropdownOptions[2].address) {
      swapUsdcToGene?.();
    }
  }

    // FUNCTION TO HANDLE CALLING OF THE SWAPP IN BUTTON
  function handleSubmit(e) {
    e.preventDefault();
    if(option == DropdownOptions[0].address){
      swapEthToGene?.();
    } else if (option == DropdownOptions[1].address) {
        if ((userDaiAllowance / 10**18) < Amount) {
            getDaiAlawee?.();
        }
      swapDaiToGene?.();
    } else if (option == DropdownOptions[2].address) {
        if ((userUsdcAllowance / 10**18) < Amount) {
            getUsdcAlawee?.();
        }
      swapUsdcToGene?.();
    }
  }
    // ARRAY OF TOKENS FOR THE DROP DOWN MENU
  const DropdownOptions = [{id:0, name: 'Eth', address:"" }, {id:1, name: 'Dai', address:"0xb9e916833acbB55ee9b0714C67Cebe9Bb267FbC6" }, 
  {id:2, name: 'Usdc', address:"0xb9e916833acbB55ee9b0714C67Cebe9Bb267FbC2" }];

  const DropdownOptions2 = [{id:0, name: 'GENE', address:"0xb9e916833acbB55ee9b0714C67Cebe9Bb267FbC2" }];

      // CALL FUNCTION FOR ETH TO GENE CONVERSION
  const { data: swapData, write: swapEthToGene, isLoading:sendLoading } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: swapAddress,
    abi: swapABI,
    functionName: "swapEthToGene",
    args: [],
    overrides: {
      value: ethers.utils.parseEther(String(Amount)?? "0"),
    },

  });

   const { data: swapWaitData, isLoading:loadingWaitData } = useWaitForTransaction({
    hash: swapData?.hash,
    onSuccess(result) {
      console.log("DATA: ", result);
      console.log("mintWaitData: ", swapWaitData);
      console.log("mintData (tokenId): ", swapData);
    },
    onError(error) {
      console.log("Error: ", error);
    },
  });


    // CALL FUNCTION FOR USDC TO GENE CONVERSION
    const { data: swapData3, write: swapUsdcToGene, isLoading:sendLoading3 } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: swapAddress,
    abi: swapABI,
    functionName: "swapUsdcToGene",
    args: [ethers.utils.parseEther(String(Amount)?? "0")],
  });

   const { data: swapWaitData3, isLoading:loadingWaitData3 } = useWaitForTransaction({
    hash: swapData3?.hash,
    onSuccess(result) {
      console.log("DATA: ", result);
      console.log("mintWaitData: ", swapWaitData3);
      console.log("mintData (tokenId): ", swapData3);
    },
    onError(error) {
      console.log("Error: ", error);
    },
  });


      // CALL FUNCTION FOR Dai TO GENE CONVERSION
    const { data: swapDataDai, write: swapDaiToGene, isLoading:sendLoading4 } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: swapAddress,
    abi: swapABI,
    functionName: "swapDaiToGene",
    args: [ethers.utils.parseEther(String(Amount)?? "0")],
  });

   const { data: swapWaitDataDai, isLoading:loadingWaitData4 } = useWaitForTransaction({
    hash: swapDataDai?.hash,
    onSuccess(result) {
      console.log("DATA: ", result);
      console.log("mintWaitData: ", swapWaitDataDai);
      console.log("mintData (tokenId): ", swapDataDai);
    },
    onError(error) {
      console.log("Error: ", error);
    },
  });


    return (
    <div>
        {/*---------------------- SWAPP IN SECTION STARTS HERE ----------------*/}
        <div className="flex items-center justify-center h- h-screen ">
        <form onSubmit={handleSubmit}>
            <div className="justify-center border border-teal-500 p-10 bg-gray-200 text-gray-800 rounded-lg flex flex-col gap-5 top-[-20%] shadow-md">
            <p> SWAPP TOKENS TO GENE TOKEN TO PARTICIPATE IN UPCOMING LAUNCHPADS AND PRESLAE </p>
            <label htmlFor="option">SWAP FROM: </label>
            <select id="option" value={option} onChange={handleOptionChange}>
              {DropdownOptions.map((option) => (
                <option key={option.id} value={option.address}>
                  {option.name}
                </option>
              ))}
            </select>

             <label htmlFor="option">SWAP TO: </label>
            <select id="option" value={option}>
              {DropdownOptions2.map((option) => (
                <option key={option.id} value={option.address}>
                  {option.name}
                </option>
              ))}
            </select>
            <br/>
            <label className="block">Amount</label>
            <input
                id="string"
                type="Any"
                placeholder="0.00"
                className="p-3 border border-teal-500 rounded-lg"
                onChange={(e) => {
                setAmount(Number(e.target.value));
                console.log(Amount);
                }}
            />
            <br/>
            <button
            type="submit"
            className="py-3 px-8 bg-green-600 border border-green-100 font-semibold rounded-lg"
            >
            { UsdcAlaweeLoading || loadingUsdcAlaweeWaitData || alaweeLoading || loadingAlaweeWaitData || sendLoading || loadingWaitData || sendLoading3 || loadingWaitData3 || sendLoading4 || loadingWaitData4 ? "PROCESSING...." : "SWAP IN"}
            </button>
          </div>
        </form>
        </div>

    </div>
  );
}
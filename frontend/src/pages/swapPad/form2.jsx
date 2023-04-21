import Head from "next/head";
import {
  useAccount,
  useContractRead,
  useContractReads,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import swapABI from "../../utils/swap_ABI.json";
import { ethers } from "ethers";
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { stringify } from "querystring";
import tokenABI from "../../utils/token_ABI.json";
import { swapPadAddr } from "../../utils/addresses";
import { DaiAddress } from "../../utils/addresses";
import { UsdcAddr } from "../../utils/addresses";
import { GeneAddress } from "../../utils/addresses";
import reusable from "../../styles/reusable.module.css";
import styles from "../../styles/swap.module.css";
import dailogo from "../../images/dailogoo.png";
import usdclogo from "../../images/usdcc.png";
import ethlogo from "../../images/ethlogoo.png";
import GITlogo from "../../images/2.png";
import swapp from "../../images/swapp.png";
import Image from "next/image";
import { Decimal } from 'decimal.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  

export default function SwappIn() {
  const { address } = useAccount();
  const swapAddress = swapPadAddr();
  const daiAddress = DaiAddress();
  const usdcAddress = UsdcAddr();
  const [option, setOption] = useState("");
  const [Amount, setAmount] = useState(0);
  const [userUsdcAllowance, setUserUsdcAllowance] = useState();
  const [userDaiAllowance, setUserDaiAllowance] = useState();

const notify = () => toast("Wow so easy !");

  // CHECK ALLOWANCE THE USER HAS GRANTED
  useContractRead({
    address: daiAddress,
    abi: tokenABI,
    functionName: "allowance",
    args: [address, swapAddress],
    watch: true,
    onSuccess(data) {
      setUserDaiAllowance(Number(data));
    },
  });

  useContractRead({
    address: usdcAddress,
    abi: tokenABI,
    functionName: "allowance",
    args: [address, swapAddress],
    watch: true,
    onSuccess(data) {
      setUserUsdcAllowance(Number(data));
    },
  });

  // GRANT ALLOWANCE
  const {
    data: UsdcAlawee,
    write: getUsdcAlawee,
    isLoading: UsdcAlaweeLoading,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: usdcAddress,
    abi: tokenABI,
    functionName: "approve",
    args: [swapAddress, ethers.utils.parseEther(String(Amount) ?? "0")],
  });

  const { data: UsdcAlaweeWaitData, isLoading: loadingUsdcAlaweeWaitData } =
    useWaitForTransaction({
      hash: UsdcAlawee?.hash,
      onSuccess(result) {
        handleSubmit2b();
       toast("Approval Granted, Swap Initiated");

      },
      onError(error) {
        console.log("Error: ", error);
        toast(`ERROR ${error}`);

      },
    });
  // GRANT ALLOWANCE
  const {
    data: alawee,
    write: getDaiAlawee,
    isLoading: alaweeLoading,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: daiAddress,
    abi: tokenABI,
    functionName: "approve",
    args: [swapAddress, ethers.utils.parseEther(String(Amount) ?? "0")],
  });

  const { data: alaweeWaitData, isLoading: loadingAlaweeWaitData } =
    useWaitForTransaction({
      hash: alawee?.hash,
      onSuccess(result) {
        handleSubmit2b();
        toast("Approval Granted, Swap Initiated");

      },
      onError(error) {
        console.log("Error: ", error);
        toast(`ERROR ${error}`);

      },
    });

  // HANDLE CHANGES IN THE SWAPIN DROPDOWN MENU
  const handleOptionChange = async (event) => {
    // setOption(0)
    const hello = event.target.value;
    setOption(hello);
    console.log(hello);
  };

  const checkImage = async () => {
  if ( option == DropdownOptions[1].address)  {
    console.log("true");
    return DropdownOptions[1].image;
  } else if (option == DropdownOptions[2].address) {
    console.log("false");
    return DropdownOptions[2].image;
  } else {
    return DropdownOptions[0].image;
  }
}

  function handleSubmit2b() {
    if (option == DropdownOptions[0].address) {
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

    notify();
    if (option == DropdownOptions[0].address) {
      swapEthToGene?.();
    } else if (option == DropdownOptions[1].address) {
      if (userDaiAllowance / 10 ** 18 < Amount) {
        getDaiAlawee?.();
      }
      swapDaiToGene?.();
    } else if (option == DropdownOptions[2].address) {
      if (userUsdcAllowance / 10 ** 18 < Amount) {
        getUsdcAlawee?.();
      }
      swapUsdcToGene?.();
    }
  }
  // ARRAY OF TOKENS FOR THE DROP DOWN MENU
  const DropdownOptions = [
    { id: 0, name: "ETH", address: "", image: { ethlogo } },
    {
      id: 1,
      name: "DAI",
      address: "0xb9e916833acbB55ee9b0714C67Cebe9Bb267FbC6",
      image: { dailogo },
    },
    {
      id: 2,
      name: "USDC",
      address: "0xb9e916833acbB55ee9b0714C67Cebe9Bb267FbC2",
      image: { usdclogo },
    },
  ];

  const DropdownOptions2 = [
    {
      id: 0,
      name: "GIT",
      address: "0xb9e916833acbB55ee9b0714C67Cebe9Bb267FbC2",
    },
  ];

  // CALL FUNCTION FOR ETH TO GENE CONVERSION
  const {
    data: swapData,
    write: swapEthToGene,
    isLoading: sendLoading,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: swapAddress,
    abi: swapABI,
    functionName: "swapEthToGene",
    args: [],
    overrides: {
      value: ethers.utils.parseEther(String(Amount) ?? "0"),
    },
  });

  const { data: swapWaitData, isLoading: loadingWaitData } =
    useWaitForTransaction({
      hash: swapData?.hash,
      onSuccess(result) {
        console.log("DATA: ", result);
        console.log("mintWaitData: ", swapWaitData);
        console.log("mintData (tokenId): ", swapData);
        toast("TRANSACTION SUCCESSFUL..... SWAP COMPLETED");

      },
      onError(error) {
        console.log("Error: ", error);
        toast(`ERROR ${error}`);

      },
    });

  // CALL FUNCTION FOR USDC TO GENE CONVERSION
  const {
    data: swapData3,
    write: swapUsdcToGene,
    isLoading: sendLoading3,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: swapAddress,
    abi: swapABI,
    functionName: "swapUsdcToGene",
    args: [ethers.utils.parseEther(String(Amount) ?? "0")],
  });

  const { data: swapWaitData3, isLoading: loadingWaitData3 } =
    useWaitForTransaction({
      hash: swapData3?.hash,
      onSuccess(result) {
        console.log("DATA: ", result);
        console.log("mintWaitData: ", swapWaitData3);
        console.log("mintData (tokenId): ", swapData3);
        toast("TRANSACTION SUCCESSFUL..... SWAP COMPLETED");

      },
      onError(error) {
        console.log("Error: ", error);
       toast(`ERROR ${error}`);

      },
    });

  // CALL FUNCTION FOR Dai TO GENE CONVERSION
  const {
    data: swapDataDai,
    write: swapDaiToGene,
    isLoading: sendLoading4,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: swapAddress,
    abi: swapABI,
    functionName: "swapDaiToGene",
    args: [ethers.utils.parseEther(String(Amount) ?? "0")],
  });

  const { data: swapWaitDataDai, isLoading: loadingWaitData4 } =
    useWaitForTransaction({
      hash: swapDataDai?.hash,
      onSuccess(result) {
        console.log("DATA: ", result);
        console.log("mintWaitData: ", swapWaitDataDai);
        console.log("mintData (tokenId): ", swapDataDai);
        toast("TRANSACTION SUCCESSFUL..... SWAP COMPLETED");

      },
      onError(error) {
        console.log("Error: ", error);
        toast(`ERROR ${error}`);

      },
    });

  return (
    <div>
      {/*---------------------- SWAPP IN SECTION STARTS HERE ----------------*/}
      <div className={`${styles.swapInOut} mt-5`}>
        <form onSubmit={handleSubmit}>
          <div className="">
            <p className={`mb-8 ${styles.optiondescription} font-pop mt-[1.2rem] text-xl`}>
              {" "}
              SWAPP OTHER TOKENS TO GIT TOKEN{" "}
            </p>
            
            <div className="flex flex-row gap-4 justify-center items-center mb-3">
            <div className={styles.optiondiv}>
            <div className="h-[3rem] w-[3rem] mr-[-2rem]">
               <Image src={(option == DropdownOptions[0].address) ? ethlogo : (option == DropdownOptions[2].address) ? usdclogo : dailogo }/>
            </div>
              <label className={styles.labels} htmlFor="option">
              </label>
              <select
                className={styles.optionbar}
                id="option"
                value={option}
                onChange={handleOptionChange}
              >
                {DropdownOptions.map((option) => (
                  <option key={option.id} value={option.address} className={styles.option}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="h-[3rem]">
               <Image src={swapp}/>
            </div>

            <div className={styles.optiondiv}>
              <div className="h-[3rem] w-[3rem] mr-[-2rem]">
               <Image src={GITlogo}/>
            </div>
              <label className={styles.labels} htmlFor="option">
              </label>
              <select className={styles.optionbar} id="option" value={option} disabled>
                {DropdownOptions2.map((option) => (
                  <option key={option.id} value={option.address}>
                    {option.name}
                  </option>
                ))}
                
              </select>
            </div>
            </div>
            <br />
            <label className={styles.labels}></label>
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
              className={`${reusable.buttons} mt-7 font-pop`}
              disabled={
                UsdcAlaweeLoading ||
                loadingUsdcAlaweeWaitData ||
                alaweeLoading ||
                loadingAlaweeWaitData ||
                sendLoading ||
                loadingWaitData ||
                sendLoading3 ||
                loadingWaitData3 ||
                sendLoading4 ||
                loadingWaitData4
              }
            >
              {UsdcAlaweeLoading ||
              loadingUsdcAlaweeWaitData ||
              alaweeLoading ||
              loadingAlaweeWaitData ||
              sendLoading ||
              loadingWaitData ||
              sendLoading3 ||
              loadingWaitData3 ||
              sendLoading4 ||
              loadingWaitData4
                ? "PROCESSING...."
                : "SWAP IN"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

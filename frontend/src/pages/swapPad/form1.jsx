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
import { UsdcAddress } from "../../utils/addresses";
import { GeneAddress } from "../../utils/addresses";
import reusable from "../../styles/reusable.module.css";
import styles from "../../styles/swap.module.css";
import dailogo from "../../images/dailogoo.png";
import usdclogo from "../../images/usdcc.png";
import ethlogo from "../../images/ethlogoo.png";
import swapp from "../../images/swapp.png";
import Image from "next/image";
import GITlogo from "../../images/2.png";


// import (useState)

export default function SwappOut() {
  const { address } = useAccount();
  const daiAddress = DaiAddress();
  const geneAddress = GeneAddress();
  const [optionO, setOptionO] = useState("");
  const [AmountO, setAmountO] = useState(0);
  const [userAllowance, setUserAllowance] = useState();

  // CHECK ALLOWANCE THE USER HAS GRANTED
  useContractRead({
    address: geneAddress,
    abi: tokenABI,
    functionName: "allowance",
    args: [address, swapPadAddr()],
    watch: true,
    onSuccess(data) {
      setUserAllowance(Number(data));
      console.log(Number(data));
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
    args: [swapPadAddr(), ethers.utils.parseEther(String(AmountO) ?? "0")],
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

  const handleApprove = (e) => {
    e.preventDefault();
    getAlawee?.();
  };

  // USEEFFECT TO CHECK THE ALLOWANCE ON LOAD

  // HANDLE CHANGES IN THE SWAPOUT DROPDOWN MENU
  const handleOptionChange2 = async (event) => {
    // setOption(0)
    const hello = event.target.value;
    setOptionO(hello);
  };

  // ARRAY OF TOKENS FOR THE DROP DOWN MENU
  const DropdownOptions3 = [
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
      name: "GENE",
      address: "0xb9e916833acbB55ee9b0714C67Cebe9Bb267FbC2",
    },
  ];

  // FUNCTION TO HANDLE CALLING OF THE SWAPP OUT BUTTON
  function handleSubmit2(e) {
    e.preventDefault();
    if (optionO == DropdownOptions3[0].address) {
      swapGeneToEth?.();
    } else if (optionO == DropdownOptions3[1].address) {
      swapGeneToDai?.();
    } else if (optionO == DropdownOptions3[2].address) {
      swapGeneToUsdc?.();
    }
  }
  function handleSubmit2b() {
    if (optionO == DropdownOptions3[0].address) {
      swapGeneToEth?.();
    } else if (optionO == DropdownOptions3[1].address) {
      swapGeneToDai?.();
    } else if (optionO == DropdownOptions3[2].address) {
      swapGeneToUsdc?.();
    }
  }

  // CALL FUNCTION FOR GENE TO ETH
  const {
    data: swapData2,
    write: swapGeneToEth,
    isLoading: sendLoading2,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: swapPadAddr(),
    abi: swapABI,
    functionName: "swapGeneForEth",
    args: [ethers.utils.parseEther(String(AmountO) ?? "0")],
  });
  const { data: swapWaitData2, isLoading: loadingWaitData2 } =
    useWaitForTransaction({
      hash: swapData2?.hash,
      onSuccess(result) {
        console.log("DATA: ", result);
        console.log("mintWaitData: ", swapWaitData2);
        console.log("mintData (tokenId): ", swapData2);
      },
      onError(error) {
        console.log("Error: ", error);
      },
    });

  // CALL FUNCTION FOR GENE TO DAI
  const {
    data: swapData4,
    write: swapGeneToDai,
    isLoading: sendLoading4,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: swapPadAddr(),
    abi: swapABI,
    functionName: "swapGeneToDai",
    args: [ethers.utils.parseEther(String(AmountO) ?? "0")],
  });
  const { data: swapWaitData4, isLoading: loadingWaitData4 } =
    useWaitForTransaction({
      hash: swapData4?.hash,
      onSuccess(result) {
        console.log("DATA: ", result);
        console.log("mintWaitData: ", swapWaitData4);
        console.log("mintData (tokenId): ", swapData4);
      },
      onError(error) {
        console.log("Error: ", error);
      },
    });

  // CALL FUNCTION FOR GENE TO USDC
  const {
    data: swapData5,
    write: swapGeneToUsdc,
    isLoading: sendLoading5,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: swapPadAddr(),
    abi: swapABI,
    functionName: "swapGeneToUsdc",
    args: [ethers.utils.parseEther(String(AmountO) ?? "0")],
  });
  const { data: swapWaitData5, isLoading: loadingWaitData5 } =
    useWaitForTransaction({
      hash: swapData5?.hash,
      onSuccess(result) {
        console.log("DATA: ", result);
        console.log("mintWaitData: ", swapWaitData5);
        console.log("mintData (tokenId): ", swapData5);
      },
      onError(error) {
        console.log("Error: ", error);
      },
    });

  return (
    <div>
      {/*---------------------- SWAPP OUT SECTION STARTS HERE ----------------*/}

      <div className={styles.swapInOut}>
        <form
          onSubmit={
            userAllowance / 10 ** 18 < AmountO ? handleApprove : handleSubmit2
          }
        >
          <div className="">
            <p className={`${styles.optiondescription} font-pop mt-[2.4rem] text-xl mb-8`}>
              {" "}
              SWAP GENE TOKENS TO OTHER TOKENS{" "}
            </p>
            <div className="flex flex-row gap-4 justify-center items-center mb-3">
            <div className={styles.optiondiv}>
              <div className="h-[3rem] w-[3rem] mr-[-2rem]">
               <Image src={GITlogo}/>
            </div>
              <label className={styles.labels} htmlFor="option">
              </label>
              <select id="option" className={styles.optionbar} value={optionO} disabled>
                {DropdownOptions2.map((option) => (
                  <option key={option.id} value={option.address} className={styles.option}>
                    {option.name}
                    {/* <Image src={option.image} alt="" /> */}
                  </option>
                ))}
              </select>
            </div>

            <div className="h-[3rem]">
               <Image src={swapp}/>
            </div>

            <div className={styles.optiondiv}>
              <div className="h-[3rem] w-[3rem] mr-[-2rem]">
               <Image src={(optionO == DropdownOptions3[0].address) ? ethlogo : (optionO == DropdownOptions3[2].address) ? usdclogo : dailogo }/>
            </div>
              <label className={styles.labels} htmlFor="optionOut">
              </label>
              <select
                id="optionOut"
                className={styles.optionbar}
                value={optionO}
                onChange={handleOptionChange2}
              >
                {DropdownOptions3.map((option) => (
                  <option key={option.id} value={option.address} className={styles.option}>
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
              className={`${styles.amountbar} mb-7`}
              onChange={(e) => {
                setAmountO(Number(e.target.value));
                console.log(AmountO);
              }}
            />
            <br />
            <button
              type="submit"
              className={reusable.buttons}
              disabled={
                alaweeLoading ||
                loadingAlaweeWaitData ||
                sendLoading2 ||
                loadingWaitData2 ||
                sendLoading5 ||
                loadingWaitData5 ||
                sendLoading4 ||
                loadingWaitData4
              }
            >
              {userAllowance / 10 ** 18 < AmountO
                ? " APPROVE"
                : alaweeLoading ||
                  loadingAlaweeWaitData ||
                  sendLoading2 ||
                  loadingWaitData2 ||
                  sendLoading5 ||
                  loadingWaitData5 ||
                  sendLoading4 ||
                  loadingWaitData4
                ? "PROCESSING...."
                : "SWAP OUT"}
            </button>
            {/* ((userAllowance / 10**18 ) < AmountO) ? "APPROVE" :  */}
          </div>
        </form>
      </div>
    </div>
  );
}

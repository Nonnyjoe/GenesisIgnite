import Head from "next/head";
import Navbar from "../components/Navbar";
// import { Inter } from "next/font/google";
import PageLayout from "../layout/PageLayout";
import ConnectionButton from "../components/ConnectionButton"
import { useAccount, useContractRead, useContractReads, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import swapABI from "../utils/swap_ABI.json"
import tokenABI from "../utils/token_ABI.json"
import {swapPadAddr} from "../utils/addresses"
import axios from "axios"
import { ethers } from "ethers";
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { stringify } from "querystring";
import SwappOut from "./form1";
import SwappIn  from "./form2";
// import (useState)

export default function Mint() {

  const [showDetails, setShowDetails] = useState(false);

  const handleClick1 = () => {
      setShowDetails(false);
  };

    const handleClick2 = () => {
      setShowDetails(true);
  };

  return (
    <div>
        <Head>
        <title>Web3Bridge | Users </title>
        <meta name="description" content="This is the application for web3Bridge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageLayout>
        <button
            type="button"
            className="py-3 px-8 bg-green-600 border border-green-100 font-semibold rounded-lg"
            onClick={handleClick2}
            >
            {"SWAP IN"}
            </button>

             <button
            type="button"
            className="py-3 px-8 bg-green-600 border border-green-100 font-semibold rounded-lg"
            onClick={handleClick1}
            >
             {"SWAP OUT"}
            </button>
            <h1 className="text-2xl font-bold text-center mb-[-10%] mt-20"> SWAP TOKEN </h1>
            
            {showDetails ? (
                  <SwappIn /> 

            ) : 
            (
                  <SwappOut />

            )}

      </PageLayout>
    </div>
  );

 
}
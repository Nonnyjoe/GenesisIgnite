import { useAccount, useContractRead, Suspense, useContractReads, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import LPFactoryABI from "../utils/LPFactory.json";
import PageLayout from "../layout/PageLayout";
import {Launchpads} from "./Molecules/Launchpads";
import { ethers } from "ethers";
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";

export default function Pages() {
const { address } = useAccount();
const LaunchPadFactory1 = "0x0BB2e255856619eE0a60aC5a1E303BE0590Cf754";
const [LaunchPads, setLaunchPads] =  useState([]);

// GET A LIST OF ALL THE LAUNCHPADS
 useContractRead({
    address: LaunchPadFactory1,
    abi: LPFactoryABI,
    functionName: 'getLaunchPads',
    onSuccess(data){
    setLaunchPads(data);
    }
  })


  return (
    <PageLayout>

    <main className=" mt-10 w-5/6">
      <h1 className="text-2xl font-semibold">LaunchPads</h1>
      <div className="grid grid-cols-3 gap-8 mt-10">

          {LaunchPads?.map((e, i) => {
            return (
              <div key={i} onClick={()=>console.log("boyyyyyyyyy")}>
                {/* // {e} */}
                <Launchpads key={i} contractAddress={e} />
              </div>
             


            )
          })}
      </div>
    </main>
    </PageLayout>
    
  )




  


  // 









}
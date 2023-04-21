import styles from "../../styles/launchpad.module.css"
import {LaunchPadFacoryAddr} from "../../utils/addresses";
import LPFactoryABI from "../../utils/LPFactory.json";
import { useAccount, useContractRead, Suspense, useContractReads, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import IndPresale from "./IndPresale";
import Link from "next/link";
import Image from "next/image";
import plus from "../../images/plus.png";



export default function Presale(){

const { address } = useAccount();
const LaunchPadFactory = LaunchPadFacoryAddr();
const [PresalePads, setPresalePads] =  useState([]);




// GET A LIST OF ALL THE PRESALES
 useContractRead({
    address: LaunchPadFactory,
    abi: LPFactoryABI,
    functionName: 'DisplayPresales',
    onSuccess(data){
    setPresalePads(data);
    }
  })


return(
    <div className={`${styles.launchpad} flex flex-col`}>
        <div className={`${styles.topBar} flex flex-row `}>
        </div>
        <div className={styles.lauchpadscards}>
 
          {PresalePads?.map((e, i) => {
            return (
              <div key={i}>
                {/* // {e} */}
                <IndPresale key={i} contractAddress={e} />
              </div>
            )
          })}
      </div>
    </div>
)



}
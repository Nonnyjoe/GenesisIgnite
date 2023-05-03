import styles from "../../styles/launchpad.module.css"
import {GENESISCONTROLLER} from "../../utils/addresses";
import controllerABI from "../../utils/controllerABI.json";
import { useAccount, useContractRead, Suspense, useContractReads, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import IndPresale from "./IndPresale";
import Link from "next/link";
import Image from "next/image";
import plus from "../../images/plus.png";
import Tilt from 'react-parallax-tilt';


export default function Presale(){

const { address } = useAccount();
const [PresalePads, setPresalePads] =  useState([]);




// GET A LIST OF ALL THE PRESALES
 useContractRead({
    address: GENESISCONTROLLER(),
    abi: controllerABI,
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
                 <Tilt glareEnable={true} glareBorderRadius={"2rem"}>
                {/* // {e} */}
                <IndPresale key={i} contractAddress={e} />
                </Tilt>
              </div>
            )
          })}
      </div>
    </div>
)



}
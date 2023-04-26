import styles from "../../styles/launchpad.module.css";
import { LaunchPadFacoryAddr } from "../../utils/addresses";
import LPFactoryABI from "../../utils/LPFactory.json";
import {
  useAccount,
  useContractRead,
  Suspense,
  useContractReads,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import IndLaunchpads from "../launchpad/IndLaunchpads";
import Link from "next/link";
import Image from "next/image";
import plus from "../../images/plus.png";
import Tilt from "react-parallax-tilt";

export default function Launchpad() {
  const { address } = useAccount();
  const LaunchPadFactory = LaunchPadFacoryAddr();
  const [LaunchPads, setLaunchPads] = useState([]);

  // GET A LIST OF ALL THE LAUNCHPADS
  useContractRead({
    address: LaunchPadFactory,
    abi: LPFactoryABI,
    functionName: "getLaunchPads",
    onSuccess(data) {
      setLaunchPads(data);
      console.log(data);
    },
  });

  return (
    <div className={`${styles.launchpad} flex flex-col`}>
      <div className={styles.lauchpadscards}>
        {LaunchPads?.map((e, i) => {
          return (
            <div key={i}>
              <Tilt glareEnable={true} glareBorderRadius={"2rem"}>
                {/* // {e} */}
                <IndLaunchpads key={i} contractAddress={e} />
              </Tilt>
            </div>
          );
        })}
      </div>
    </div>
  );
}

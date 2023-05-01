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
import Daocards from "./Daocards";
import Link from "next/link";
import Image from "next/image";
import plus from "../../images/plus.png";
import Tilt from "react-parallax-tilt";
import Daostyles from "../../styles/Dao.module.css"

export default function Daodetails() {
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
      <div>
        <h3 className={Daostyles.headers}>Available DAOs</h3>
        <p>Note: To Participate in a DAO, you must have Purchased the DAO's token, either from a Launchpad or presale session</p>
      </div>
      <div className={styles.lauchpadscards}>
        {LaunchPads?.map((e, i) => {
          return (
            <div key={i}>
              <Tilt glareEnable={true} glareBorderRadius={"2rem"}>
                {/* // {e} */}
                <Daocards key={i} contractAddress={e} />
              </Tilt>
            </div>
          );
        })}
      </div>
    </div>
  );
}

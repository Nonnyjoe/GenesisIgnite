import { useAccount, useContractRead } from "wagmi";
import { useContext, useState } from "react";
import LPFactoryABI from "../../utils/LPFactory.json";
import LPABI from "../../utils/LPABI.json";
import { LaunchPadFacoryAddr } from "../../utils/addresses";
import Link from "next/link";
import styles from "../../styles/dashboard.module.css";
import igniteNft from "../../images/pngwing.com.png";
import Image from "next/image";

const Launchpads = ({ contractAddress }) => {
 const [userContribution, setUserContribution] = useState();
const { address } = useAccount();

  const FP = contractAddress ? contractAddress.slice( 0, 4): `0X000`;
  const LP =contractAddress ? contractAddress.slice(-4) : `0000`;

 useContractRead({
    address: contractAddress,
    abi: LPABI,
    functionName: "getGenesDepositedByUser",
    args: [address],
    onSuccess(data) {
      setUserContribution(data);
      console.log(userContribution);
    },
  });

  return(
    <div>
        <Link href={`./launchpad/${contractAddress}`}>
        <div className={`${styles.history} flex flex-row gap-[5rem] mt-2`}>
          <p>{`${FP}...${LP}`}</p>
          <p>{userContribution / 10**18} GIT</p>
        </div>
        </Link>
    </div>
  )

}

export default Launchpads;
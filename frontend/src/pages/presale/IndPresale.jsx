import { erc20ABI, useContractRead } from "wagmi";
import { useContext, useState } from "react";
import LPFactoryABI from "../../utils/LPFactory.json";
import { LaunchPadFacoryAddr } from "../../utils/addresses";
import Link from "next/link";
import styles from "../../styles/launchpad.module.css"
import igniteNft from "../../images/dodge.png";
import Image from "next/image";
import LPABI from "../../utils/LPABI.json";

// import PageLayout from "../../layout/PageLayoutt";

const IndPresale = ({ contractAddress }) => {
    
  const [LaunchPadData, setLaunchPadData] = useState({});
  const [LaunchPadEndTime, setLaunchPadEndTime] = useState();

  const {
    data: BuyersData,
    isError,
    isLoading,
  } = useContractRead({
    address: LaunchPadFacoryAddr(),
    abi: LPFactoryABI,
    functionName: "displayTokenDetails",
    args: [contractAddress],
    onSuccess(data) {
      setLaunchPadData(data);
      console.log(data);
    },
  });
  
  console.log(contractAddress);

  useContractRead({
    address: contractAddress,
    abi: LPABI,
    functionName: "viewLaunchPadEndTime",
    onSuccess(data) {
      setLaunchPadEndTime((data).toString());
      console.log(data);
    },
  });

    const epochTime = () => {
    const now = new Date();
    const epochTime = Math.floor(now.getTime() / 1000);
    if (epochTime > LaunchPadEndTime) {
      return false;
    } else {
        return true;
    }
  };


function getTimeAgo(epochTime) {
  const now = new Date().getTime() / 1000;
  const diffInSeconds = now - epochTime;
  const diffInDays = Math.floor(diffInSeconds / (60 * 60 * 24));
  const diffInHours = Math.floor(diffInSeconds / (60 * 60));
  const date = new Date(epochTime * 1000);
  const dateString = date.toDateString();
  
  if (diffInDays > 0) {
    return `${diffInDays} days ago`;
  } else if (diffInHours > 0) {
    return `${diffInHours} hrs ago`;
  } else {
    return `less than an hour ago`;
  }
}

  const launchStatusClassName = epochTime() ? styles.launchongoing : styles.launchended;

  return (
    <div>
    <div className={styles.cardlink}>
    <Link href={`./presale/${contractAddress}`}>
      <div className={styles.cardwrapper}>
        <div className={styles.cards}>
          <div className={styles.cardimage}>
            <Image src={igniteNft} />
          </div>

          <p className={` text-sm ${styles.status}`}>{epochTime() ? `NEW` : getTimeAgo(LaunchPadEndTime)}</p>

          <div className={styles.namestatusdetails}>
          
          <p className={`${styles.lauchpadname} font-semibold font-EudoxusSansBold uppercase`}>
            {LaunchPadData.name}
          </p>
             <p className="font-semibold">
            {LaunchPadData.symbol}
          </p>
          </div>

          <div className={`${styles.symboladdress} mt-[0rem] flex flex-row-reverse`}>
          <p className={`text-sm ${launchStatusClassName}`}>{epochTime() ? `ONGOING` : `ENDED`}</p>
       
          <p className=" text-sm ">{`${contractAddress.slice(
            0,
            4
          )}...${contractAddress.slice(-4)}`}</p>
          </div>
        </div>
      </div>
    </Link>
    </div>
    </div>
  );
};

export default IndPresale;
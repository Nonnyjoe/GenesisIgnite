import { erc20ABI, useContractRead } from "wagmi";
import { useContext, useState } from "react";
import LPFactoryABI from "../../utils/LPFactory.json";
import { LaunchPadFacoryAddr } from "../../utils/addresses";
import Link from "next/link";
import styles from "../../styles/launchpad.module.css";
import igniteNft from "../../images/dodge.png";
import Image from "next/image";
import LPABI from "../../utils/LPABI.json";


const Daocards = ({ contractAddress }) => {
  const [LaunchPadData, setLaunchPadData] = useState({});
  const [LaunchPadEndTime, setLaunchPadEndTime] = useState();
  const [LaunchPadToken, setLaunchPadToken] = useState();
  const [cid, setCid] = useState();

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
    functionName: "viewLaunchPadToken",
    onSuccess(data) {
      setLaunchPadToken(data.toString());
      console.log(data);
    },
  });

  useContractRead({
    address: LaunchPadFacoryAddr(),
    abi: LPFactoryABI,
    functionName: "returnCid",
    args: [LaunchPadToken ?? "0x00"],
    onSuccess(data) {
      setCid(data.toString());
      console.log(data);
    },
  });



  const FP = contractAddress ? contractAddress.slice(0, 4) : `0X000`;
  const LP = contractAddress ? contractAddress.slice(-4) : `0000`;

  return (
    <div className="cursor-pointer">
      <div className={styles.cardlink}>
        <Link href={`./dao/${contractAddress}`}>
          <div className={styles.cardwrapper}>
            <div className={styles.cards}>
              {cid ? (
                <div className={styles.cardimage}>
                  <img
                    src={`https://${cid}.ipfs.w3s.link/tokenLogo`}
                    alt="Dummy image"
                    width="100%"
                    height="100%"
                  />
                </div>
              ) : (
                <div className={styles.cardimage}>
                  <Image src={igniteNft} />
                </div>
              )}

              <div className={styles.namestatusdetails}>
                <p
                  className={`${styles.lauchpadname} font-semibold font-pop uppercase`}
                >
                  {LaunchPadData.name} DAO
                </p>
                <p className="font-semibold">{LaunchPadData.symbol}</p>
              </div>

              <div
                className={`${styles.symboladdress} mt-[0rem] flex flex-row-reverse`}
              >
                <p>{`${FP}...${LP}`}</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Daocards;

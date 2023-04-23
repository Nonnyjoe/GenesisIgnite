import React, { useState } from "react";
import {EthClasic} from "../../utils/addresses";
import {Arbitrum} from "../../utils/addresses";
import {Shiba} from "../../utils/addresses";
import {Swapp} from "../../utils/addresses";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import EscrowAbi from "../../utils/EscrowAbi.json";
import styles from "../../styles/p2p.module.css"
import Link from "next/link";




export default function IndividualAdds(props) {
    const {escrowId, type} = props;
  const [Escrowdata, setEscrowdata] = useState({});
  const [EscrowToken, setEscrowToken] = useState();

  const {
    data: EscrowDetails,
    isError: isErrorEscrowDetails,
    isLoading: isLoadingEscrowDetails,
  } = useContractRead({
    address: Swapp(),
    abi: EscrowAbi,
    functionName: "escrowDetails",
    args: [escrowId],
    onSuccess: (data) => {
      console.log("Success", EscrowDetails);
      setEscrowdata(data);
      console.log(data);
      console.log(type);
      Escrowdata[1] == EthClasic()
                  ? setEscrowToken("EthClassic")
                  : Escrowdata[1] == Arbitrum()
                  ? setEscrowToken("Arbitrum")
                  : Escrowdata[1] == Shiba()
                  ? setEscrowToken("Shiba")
                  : setEscrowToken("Tokens")
    },
  });


const addressFP = Escrowdata.proposer?.slice(0,6);
const addressLP = Escrowdata.proposer?.slice(-6);
const id = escrowId;

  return(
    <Link href={`./p2p/fillAdd/${id}?type=${type}`}>
    <div className={`flex flex-row justify-between mb-6 cursor-pointer font-pop ${styles.indAdds}` }>
        <div>
            <p>{`${addressFP}.....${addressLP}`}</p>
        </div>
        <div>
            <p>{`1 GIT = ${(Escrowdata.rate)?.toString()} ${ Escrowdata[1] == EthClasic()
                  ? "ETC"
                  : Escrowdata[1] == Arbitrum()
                  ? "ARB"
                  : Escrowdata[1] == Shiba()
                  ? "SHIB"
                  : " " }`}
            </p>
        </div>
        <div>
            <p>{`Available: ${(Escrowdata.expectedExchangeAmount / 10**18).toFixed(2)}`}</p>
        </div>
        <div>
        {type ? (
        <div>
            <button onClick={() => console.log('Buy clicked')} className={`${styles.buyBtn} font-pop`}>Buy {` ${ Escrowdata[1] == EthClasic()
                  ? "ETC"
                  : Escrowdata[1] == Arbitrum()
                  ? "ARB"
                  : Escrowdata[1] == Shiba()
                  ? "SHIB"
                  : " " }`}</button>
        </div>
        ) : (
        <div>
            <button onClick={() => console.log('Sell clicked')} className={`${styles.sellBtn} font-pop`}>Sell {` ${ Escrowdata[1] == EthClasic()
                  ? "ETC"
                  : Escrowdata[1] == Arbitrum()
                  ? "ARB"
                  : Escrowdata[1] == Shiba()
                  ? "SHIB"
                  : " " }`}</button>
        </div>
        )}
        </div>
    </div>
    </Link>

  )


}
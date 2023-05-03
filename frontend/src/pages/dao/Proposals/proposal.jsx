import React, { useState, useEffect } from "react";
import styles from "../../../styles/Dao.module.css"
import Link from "next/link";
import LPABI from "../../../utils/LPABI.json";
import governanceABI from "../../../utils/governanceABI.json";
import {
  erc20ABI,
  useContractRead,
  useContractReads,
  useAccount,
  useContractWrite,
  useWaitForTransaction,
  wagmi,
} from "wagmi";


export default function Proposal(props) {
    const {ProposalId, index, contractAddress} = props;
  const [Governance, setGovernance] = useState();
  const [GovernanceToken, setGovernanceToken] = useState();
  const [proposalStatus, setProposalStatus] = useState();
  const [emergencyProposals, setEmergencyProposals] = useState([]);


  const state = 
    proposalStatus == 1 ? `Pending` 
    : proposalStatus == 2 ? `Active` 
    : proposalStatus == 3 ? `Canceled` 
    : proposalStatus == 4 ? `Defeated` 
    : proposalStatus == 5 ? `Succeeded` 
    : proposalStatus == 6 ? `Queued` 
    : proposalStatus == 7 ? `Expired` 
    : proposalStatus == 8 ? `Executed` : `Loading`
  ;

  const cartegory = emergencyProposals.indexOf(ProposalId) == (-1) ? `Milestone Payment Request` : `Emergency Withdrawal Request`;

  useContractRead({
    address: contractAddress,
    abi: LPABI,
    functionName: "viewGovernanceAddresses",
    args: [],
    onSuccess(data) {
      setGovernanceToken(data._governanceToken);
      setGovernance(data._governor);
    },
  });


  useContractRead({
    address: contractAddress,
    abi: LPABI,
    functionName: "viewEmergencyProposalIds",
    args: [],
    onSuccess(data) {
      setEmergencyProposals(data);
    },
  });

    useContractRead({
    address: Governance,
    abi: governanceABI,
    functionName: "state",
    args: [ProposalId],
    onSuccess(data) {
      setProposalStatus(data);
      console.log(data);
    },
  });

  const FP = ProposalId ? (ProposalId.toString()).slice( 0, 12): `0X000`;
  const LP = ProposalId ? (ProposalId.toString()).slice(-12) : `0000`;

    return (
    <Link href={`./Proposals/${ProposalId}?pad=${contractAddress}`}>
    <div className={`${styles.proposal} flex flex-row w-[100%] justify-between cursor-pointer`}>
      <div className="flex flex-col gap-2">
        <div><p>Proposal</p></div>
        <div className="flex"><p className="mr-auto ml-auto">{`# ${(index + 1).toString()}`}</p></div>
      </div>

      <div className="flex flex-col gap-2">
        <div><p>{`ID: ${FP} ........ ${LP}`}</p></div>
        <div><p>{`Cartegory: ${cartegory}`}</p></div>
      </div>     
      
      <div className=" flex ">
        <div className="mt-auto mb-auto"><p>{state}</p></div>
      </div> 
    </div>
    </Link>            
  );
}
import React, { useState, useEffect } from "react";
import styles from "../../../styles/Dao.module.css"
import styles2 from "../../../styles/launchpad.module.css";
import styles1 from "../../../styles/LaunchPads.module.css";
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
import back from "../../../images/goback.png";
import Image from "next/image";


export default function ProposalForm(props) {
    const {contractAddress} = props;
console.log(contractAddress);
  const [Governance, setGovernance] = useState();
  const [GovernanceToken, setGovernanceToken] = useState();
  const [proposalStatus, setProposalStatus] = useState();
  const [emergencyProposals, setEmergencyProposals] = useState([]);
    const [isInstallment, setIsInstallment] = useState(true);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');







  function handleRadioChange(event) {
    setIsInstallment(event.target.value === 'installment');
  }

  function handleAmountChange(event) {
    setAmount(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }



        /// CREATE INSTALMENT PROPOSAL
    const { data: instalment, write: startinstalment, isLoading:instalmentLoading } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: contractAddress,
    abi: LPABI,
    functionName: "requestInstalmentWithdrawal",
    args: [description],
  });

    const { data: waitinstalment, isLoading: waitinstalmentLoading } = useWaitForTransaction({
    hash: instalment?.hash,
    onSuccess(result) {

    },
    onError(error) {
      console.log("Error: ", error);
    },
  })


        /// CREATE EMERGENCY PROPOSAL
    const { data: Emergency, write: startEmergency, isLoading:EmergencyLoading } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: contractAddress,
    abi: LPABI,
    functionName: "requestEmmergencyWithdrawal",
    args: [amount, description],
  });

    const { data: waitEmergency, isLoading: waitEmergencyLoading } = useWaitForTransaction({
    hash: Emergency?.hash,
    onSuccess(result) {

    },
    onError(error) {
      console.log("Error: ", error);
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    isInstallment ? startinstalment?.() : startEmergency?.();
  } 


    return (
    <div className={`${styles2.launchpad} flex flex-col font-pop`}>
     <div className={`flex flex-row justify-between`}>
      <h1 className="text-5xl pb-3"> CREATE PROPOSAL</h1>
        <div className={`${styles2.topBar} flex flex-row `}>
         <Link href={`../${contractAddress}`}>
          <div className={`flex flex-row w-[14rem] h-[3.1rem] px-[rem] justify-center ml-auto gap-0 ${styles2.createBtn}`}>
            <div className="m-0 w-12 h-12">
              <Image src={back} />
            </div>
            <button className={`h-[3rem] w-[12rem] font-pop text-sm`}> GO BACK </button>
          </div>
            </Link>
        </div>      
      </div>
    <div className={`${styles.proposal2} flex items-center justify-center mt-8 mr-auto ml-auto`}>
    <div className="ml-auto mr-auto flex">
        <form className="flex flex-col w-[100%] ml-auto mr-auto" onSubmit={handleSubmit}>
        <div className="flex justify-between mb-4 gap-3">
            <label className={`${styles.VoteOption} inline-flex items-center`}>
            <input
                type="radio"
                className={`${styles.voteInput} form-radio`}
                name="withdrawal-type"
                value="installment"
                checked={isInstallment}
                onChange={handleRadioChange}
            />
            <span className="ml-2">Installment Withdrawal</span>
            </label>
            <label className={`${styles.VoteOption} inline-flex items-center`}>
            <input
                type="radio"
                className={`${styles.voteInput} form-radio`}
                name="withdrawal-type"
                value="emergency"
                checked={!isInstallment}
                onChange={handleRadioChange}
            />
            <span className="ml-2">Emergency Withdrawal</span>
            </label>
        </div>
        {!isInstallment && (
            <div className="flex flex-col mb-4 ml-auto mr-auto">
            <label htmlFor="amount" className="mb-2 mr-auto ml-auto">
                Amount
            </label>
            <input
                type="number"
                id="amount"
                name="amount"
                className={styles.amountbar}
                value={amount}
                onChange={handleAmountChange}
                placeholder={`Amount Needed`}
            />
            </div>
        )}
        <div className="flex flex-col mb-4 mr-auto ml-auto">
            <label htmlFor="description" className="mb-2 mr-auto ml-auto">
            Description
            </label>
            <input
            type="text"
            id="description"
            name="description"
            className={styles.amountbar}
            value={description}
            onChange={handleDescriptionChange}
            placeholder={`Proposal Description`}            
            />
        </div>
        <button className={`${styles1.launchpadbtn} ml-auto mr-auto`}>
           {instalmentLoading|| waitinstalmentLoading || EmergencyLoading || waitEmergencyLoading ? `Creating Proposal....` : `Create Proposal`}
        </button>
        </form>
    </div>
    </div>        
    </div>        
  );
}
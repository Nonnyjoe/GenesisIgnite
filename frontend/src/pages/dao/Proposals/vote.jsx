import styles1 from "../../../styles/Dao.module.css"
import styles from "../../../styles/LaunchPads.module.css";
import styles2 from "../../../styles/launchpad.module.css";
import {GENESISCONTROLLER} from "../../../utils/addresses";
import controllerABI from "../../../utils/controllerABI.json";
import governanceABI from "../../../utils/governanceABI.json";
import GTABI from "../../../utils/governanceTokenABI.json";
import LPABI from "../../../utils/LPABI.json";
import TOKENABI from "../../../utils/token_ABI.json";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import Daocards from "../Daocards";
import Link from "next/link";


export default function Vote(props) {
  const { pad, proposalID } = props;
  const { address } = useAccount();
  const [LaunchPads, setLaunchPads] = useState([]);
  const [vote, setVote] = useState('');
  const [hovered, setHovered] = useState(false);
  const [Governance, setGovernance] = useState();
  const [GovernanceToken, setGovernanceToken] = useState();
  const [VotesFor, setVotesFor] = useState();
  const [VotesAgainst, setVotesAgainst] = useState();
  const [VotesAbstained, setVotesAbstained] = useState();
  const [emergencyProposals, setEmergencyProposals] = useState([]);
  const [PropossalDate, setPropossalDate] = useState();
  const [ProposalDescription, setProposalDescription] = useState();
  const [RequestAmount, setRequestAmount] = useState();
  const [Instalments, setInstalments] = useState();
  const [PaidInstalments, setPaidInstalments] = useState();
  const [EndDate, setEndDate] = useState();
  const [VotingPower, setVotingPower] = useState();
  const [VoteOption, setVoteOption] = useState();
  const [votes, setVotes] = useState();
  const [hasVoted, setHasVoted] = useState();
  const [proposalStatus, setProposalStatus] = useState();


      /// VOTE FOR PROPOSALS
    const { data: castVote, write: startCastVote, isLoading:castVoteLoading } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: Governance,
    abi: governanceABI,
    functionName: "castVote",
    args: [proposalID, VoteOption],
  });

    const { data: waitCastVote, isLoading: waitCastVoteLoading } = useWaitForTransaction({
    hash: castVote?.hash,
    onSuccess(result) {
      toast.success("Vote Recorded Succesfully");
    },
    onError(error) {
        toast.error(`ERROR ${error}`);
    },
  });


      /// DELEGATE VOTE
    const { data: delegateVote, write: startdelegateVote, isLoading:delegateVoteLoading } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: GovernanceToken,
    abi: GTABI,
    functionName: "delegate",
    args: [address],
  });

    const { data: waitdelegateVote, isLoading: waitdelegateVoteLoading } = useWaitForTransaction({
    hash: delegateVote?.hash,
    onSuccess(result) {
      toast.success("Delegation Successful");
      startCastVote?.();
    },
    onError(error) {
        toast.error(`ERROR ${error}`);
    },
  })


        /// EXECUTE VOTE
    const { data: executeVote, write: startexecuteVote, isLoading:executeVoteLoading } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: pad,
    abi: LPABI,
    functionName: "Execute",
    args: [proposalID],
  });

    const { data: waitExecuteVote, isLoading: waitExecuteVoteLoading } = useWaitForTransaction({
    hash: executeVote?.hash,
    onSuccess(result) {
      toast.success("Execution Successful");
    },
    onError(error) {
        toast.error(`ERROR ${error}`);
    },
  })

    useContractRead({
    address: Governance,
    watch: true,
    abi: governanceABI,
    functionName: "hasVoted",
    args: [proposalID, address],
    onSuccess(data) {
      setHasVoted(data);
    },
  });

    useContractRead({
    address: GovernanceToken,
    abi: GTABI,
    functionName: "getVotes",
    watch: true,
    args: [address],
    onSuccess(data) {
      setVotes(data);
      console.log(data.toString())
    },
  });


  useContractRead({
    address: pad,
    abi: LPABI,
    functionName: "viewGovernanceAddresses",
    watch: true,
    args: [],
    onSuccess(data) {
      setGovernanceToken(data._governanceToken);
      setGovernance(data._governor);
    },
  });

  useContractRead({
    address: GovernanceToken,
    abi: TOKENABI,
    functionName: "balanceOf",
    args: [address],
    watch: true,
    onSuccess(data) {
     setVotingPower(data);
    },
  });

    useContractRead({
    address: pad,
    abi: LPABI,
    functionName: "viewGovernanceData",
    args: [],
    watch: true,
    onSuccess(data) {
      setInstalments(data.Instalments_);
      setPaidInstalments(data.WithdrawnInstalments_);
    },
  });

    useContractRead({
    address: Governance,
    abi: governanceABI,
    functionName: "proposalVotes",
    args: [proposalID],
    watch: true,
    onSuccess(data) {
      setVotesFor(data.forVotes);
      setVotesAgainst(data.againstVotes);
      setVotesAbstained(data.abstainVotes);
    },
  });

    useContractRead({
    address: pad,
    abi: LPABI,
    functionName: "viewEmergencyProposalIds",
    args: [],
    watch: true,
    onSuccess(data) {
      setEmergencyProposals(data);
    },
  });

    useContractRead({
    address: pad,
    abi: LPABI,
    functionName: "viewProposalData",
    args: [proposalID],
    watch: true,
    onSuccess(data) {
      setRequestAmount(data.RequestAmount);
      setProposalDescription(data.Description);
      setPropossalDate((new Date(data.RequestTime * 1000)) );
      const time = (data.RequestTime.toNumber() + 259200);
      setEndDate(new Date(time * 1000))
      Timestamp(time);
    },
  });


    const Timestamp = (data) => {
    const now = new Date();
    const epochTime = Math.floor(now.getTime() / 1000);
    console.log(`Current epoch time: ${epochTime}`);
    if (epochTime > data) {
      setProposalStatus("false");
    } else {
      setProposalStatus("true")
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(vote); 
    console.log(VoteOption); 
    !proposalStatus ? startexecuteVote?.() : votes == 0 ? startdelegateVote?.() : startCastVote?.();
  };


  const FP = proposalID ? (proposalID.toString()).slice( 0, 13): `0X000`;
  const LP = proposalID ? (proposalID.toString()).slice(-13) : `0000`;
  const cartegory = emergencyProposals.indexOf(proposalID) == (-1) ? `Milestone Payment` : `Emergency Withdrawal`;

const userStatus = hasVoted ? `YOU'VE VOTED ALREADY!` : `YOU'RE YET TO PARTICIPATE.`;

  // GET A LIST OF ALL THE LAUNCHPADS

      // Handle the mouse Over Effect of the buttons
      const handleHover = (e) => {// logs the target element
        //   const now = new Date();
        //   const epochTime = Math.floor(now.getTime() / 1000);
        // if (epochTime > LaunchPadDeadline){
          setHovered(true);
        // }
      };

      const handleMouseLeave = () => {
        setHovered(false);
      };

  return (
    <div className={`${styles2.launchpad} flex flex-col font-pop`}>
    <div className={`${styles1.poll} flex flex-row gap-5`}>
        <div className={`${styles.participate} text-base`}>
            <h1 className="mb-4">Has the creator met the benchmark to withdraw The requested Amount?</h1>
             <div className={`${styles.generaldetails} font-pop text-center justify-center align-middle flexS`}>
              <div>
                <h5 class="mt-6 font-pop">
                  <span className={styles.launcpdetailed}>
                   ACCEPTED VOTES:{" "} <br />
                   {VotesFor ? Math.floor((VotesFor.toString()) / 10**18): '000'}
                  </span>{" "}
                </h5>
              </div>
              <div>
                <h5 class="mt-4 font-pop">
                  ABSTAINED VOTES:{" "} <br/>
                  <span className={styles.launcpdetailed}>
                        {VotesAbstained ?  Math.floor((VotesAbstained.toString() / 10**18)): '000'}
                  </span>
                </h5>
              </div>
              <div>
                <h5 class="mt-4 font-pop">
                  AGAINST VOTES: {" "} <br/>
                  <span className={styles.launcpdetailed}>
                    {VotesAgainst ?  Math.floor((VotesAgainst.toString() / 10**18)) : '000'}
                  </span>
                </h5>
              </div>
            </div>
            <div className="mt-8 ml-3">
            <p className="mb-3"><span className="uppercase mr-3 text-green-400">Proposal Id:</span> {`${FP} ..... ${LP}`}</p>  
            <p className="mb-3"><span className="uppercase mr-3 text-green-400">Proposal Cartegory:</span> {cartegory}</p>  
            <p className="mb-3"><span className="uppercase mr-3 text-green-400">Proposal Date:</span> {PropossalDate?.toLocaleString()}</p>  
            <p className="mb-3"><span className="uppercase mr-3 text-green-400">Proposal Description:</span> {ProposalDescription}</p>  
            <p className="mb-3"><span className="uppercase mr-3 text-green-400">Total Instalment:</span> {Instalments ? Instalments.toString() : ""}</p>  
            <p className="mb-3"><span className="uppercase mr-3 text-green-400">Paid Instalment:</span> {PaidInstalments ? PaidInstalments.toString() : ""}</p> 
            <p className="mb-3"><span className="uppercase mr-3 text-green-400">Payment Amount:</span> {`${RequestAmount ? (RequestAmount / 10**18).toString(): " "} GIT`}</p> 
            <p className="mb-3"><span className="uppercase mr-3 text-green-400">VOTTING ENDS:</span> {EndDate?.toLocaleString()}</p>  
            </div>
        </div>
        <div className={`${styles.participate}`}>
            <form onSubmit={handleSubmit}>
            <div className={` mb-6`}>
              <h5 className={`${styles.participationheader} font-pop`}>PARTICIPATE</h5>
              <p className={`${styles.participationparagraph} text-base`}>
                {" "}
                <span className="uppercase text-green-400">Requirement: </span> You must have earned Governance Token by participating in this tokens Launchpad or presale.{" "}
                <br/>
                <br/>
                <span className="mt-5 "> <span className="text-green-400">VOTE STATUS:</span> {userStatus}</span>
              </p>

              <div className={`${styles.pl2} mt-9 font-pop w-[100%]`}>
                <p className="mb-7">
                  YOUR VOTING POWER: {votes ? Math.floor(votes.toString() / 10**18) : ""} UNITS
                </p>
                
            <label className={`${styles1.VoteOption}`}>
                    <input
                    type="radio"
                    value="accept"
                    className={`${styles1.voteInput}`}
                    checked={vote === 'accept'}
                    onChange={(event) => {setVote(event.target.value); setVoteOption(1)}}
                    />
                    Accept
                </label>
                <label className={`${styles1.VoteOption}`}>
                    <input
                    type="radio"
                    className={`${styles1.voteInput}`}
                    value="abstain"
                    checked={vote === 'abstain'}
                    onChange={(event) => {setVote(event.target.value); setVoteOption(2)}}
                    />
                    Abstain
                </label>
                 <label className={`${styles1.VoteOption}`}>
                    <input
                    type="radio"
                    className={`${styles1.voteInput}`}
                    value="reject"
                    disabled={false}
                    checked={vote === 'reject'}
                    onChange={(event) => {setVote(event.target.value); setVoteOption(0)}}
                    />
                    Reject
                </label>
                <br />
                <button
                  type="submit"
                  onMouseEnter={handleHover}
                  onMouseLeave={handleMouseLeave}
                  className={styles.launchpadbtn}
                  disabled={ 100 < 99 }
                >
                {waitExecuteVoteLoading || executeVoteLoading ? `Executing Vote...` : waitCastVoteLoading || castVoteLoading ? "VOTING......."  : waitdelegateVoteLoading || delegateVoteLoading ? "DELEGATING...." : votes == 0 ? "DELEGATE YOURSELF" :  "CAST VOTE"}
                </button>
              </div>
            </div>
          </form>
        </div>


    </div>
    </div>
  );
}
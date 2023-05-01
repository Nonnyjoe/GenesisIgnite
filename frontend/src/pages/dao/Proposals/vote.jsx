import styles1 from "../../../styles/Dao.module.css"
import styles from "../../../styles/LaunchPads.module.css";
import styles2 from "../../../styles/launchpad.module.css";
import { LaunchPadFacoryAddr } from "../../../utils/addresses";
import LPFactoryABI from "../../../utils/LPFactory.json";
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


export default function Vote() {
  const { address } = useAccount();
  const LaunchPadFactory = LaunchPadFacoryAddr();
  const [LaunchPads, setLaunchPads] = useState([]);
  const [vote, setVote] = useState('');
    const [hovered, setHovered] = useState(false);


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(vote); 
  };

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
                   1000 tokens
                  </span>{" "}
                </h5>
              </div>
              <div>
                <h5 class="mt-4 font-pop">
                  ABSTAINED VOTES:{" "} <br/>
                  <span className={styles.launcpdetailed}>
                        1000 token
                  </span>
                </h5>
              </div>
              <div>
                <h5 class="mt-4 font-pop">
                  REJECTED VOTES: {" "} <br/>
                  <span className={styles.launcpdetailed}>
                    1000 tokens
                  </span>
                </h5>
              </div>
            </div>
            <div className="mt-5 ml-3">
            <p className="mb-3">Proposal Id: 1</p>  
            <p className="mb-3">Proposal Cartegory: 1</p>  
            <p className="mb-3">Proposal Date: 1</p>  
            <p className="mb-3">Total Instalment: 1</p>  
            <p className="mb-3">Paid Instalment: 1</p> 
            <p className="mb-3">Payment Amount: 1</p> 
            <p className="mb-3">Admin Address: 1</p> 

            </div>
        </div>
        <div className={`${styles.participate}`}>
            <form onSubmit={handleSubmit}>
            <div className={` mb-6`}>
              <h5 className={`${styles.participationheader} font-pop`}>PARTICIPATE</h5>
              <p className={`${styles.participationparagraph} text-base`}>
                {" "}
                <span className="uppercase">Requirement : </span> You must have earned Governance Token by participating in this tokens Launchpad or presale.{" "}
              </p>

              <div className={`${styles.pl2} mt-9 font-pop w-[100%]`}>
              
                <p className="mb-7">
                  Your VOTING POWER: {100} GIT
                </p>
                
            <label className={`${styles1.VoteOption}`}>
                    <input
                    type="radio"
                    value="accept"
                    className={`${styles1.voteInput}`}
                    checked={vote === 'accept'}
                    onChange={(event) => setVote(event.target.value)}
                    />
                    Accept
                </label>
                <label className={`${styles1.VoteOption}`}>
                    <input
                    type="radio"
                    className={`${styles1.voteInput}`}
                    value="abstain"
                    checked={vote === 'abstain'}
                    onChange={(event) => setVote(event.target.value)}
                    />
                    Abstain
                </label>
                 <label className={`${styles1.VoteOption}`}>
                    <input
                    type="radio"
                    className={`${styles1.voteInput}`}
                    value="reject"
                    checked={vote === 'reject'}
                    onChange={(event) => setVote(event.target.value)}
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
             { (100 < 20) ? "APPROVE"  : (100 > 20) ? "LOADING...." : "PARTICIPATE"}
                </button>
              </div>
            </div>
          </form>
        </div>


    </div>
    </div>
  );
}
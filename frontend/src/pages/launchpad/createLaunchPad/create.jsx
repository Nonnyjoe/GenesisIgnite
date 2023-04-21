import { useAccount, useContractRead, Suspense, useContractReads, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import { React, useState, useReducer } from "react";
import Header from "../../../components/header";
import styles from "../../../styles/requestlaunchpad.module.css";
import reusable from "../../../styles/reusable.module.css";
import { create, Web3Storage } from 'web3.storage'
import Image from "next/image";
import click from "../../../images/click.png"
import Link from "next/link";
import { LaunchPadFacoryAddr } from "../../../utils/addresses";
import LPFactory from "../../../utils/LPFactory.json";
import tokenABI from "../../../utils/token_ABI.json";
import { ethers } from "ethers";

const token = process.env.API_TOKEN

export default function CreateLaunchpad() {
  const [messages, showMessage] = useReducer((msgs, m) => msgs.concat(m), [])
  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGIyMjlDQjE4MTU3QUU2NTBhMEIzMkNhNjZFNzczYzNFQjYzOUI2QzAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODE1NjM0NTI0ODAsIm5hbWUiOiJHZW5lc2lzSWduaXRlIn0.5dVJUn5YTwFuEZC10Mv4PD7IpWdNIHj0hgu3EkSGEjA')
  const [files, setFiles] = useState([])
  const [imageCID, setimageCID] = useState('');
  const convert = require('ethereum-unit-converter')

  const [formData, setFormData] = useState({
    RegId: "",
    projectName: "",
    Symbol: "",
    tokenAddress: "",
    agreement: false,
    LPTotalSupply: "",
    PSTotalSupply: "",
    LPDuration: "",
    percentageIncrease: ""
    // imageCID: ""
  });


console.log(JSON.stringify(convert(7580, 'ether').wei))

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    getAlawee?.();
  }  


    // GRANT ALLOWANCE
  const {
    data: alawee,
    write: getAlawee,
    isLoading: alaweeLoading,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: formData?.tokenAddress ? ethers.utils.getAddress(formData.tokenAddress) : undefined,
    abi: tokenABI,
    functionName: "approve",
    args: [LaunchPadFacoryAddr(), ethers.utils.parseEther(formData.LPTotalSupply ? String(formData.LPTotalSupply) : "0")],
  });

  const { data: alaweeWaitData, isLoading: loadingAlaweeWaitData } =
    useWaitForTransaction({
      hash: alawee?.hash,
      onSuccess(result) {
      createLaunchPad?.();

      },
      onError(error) {
        console.log("Error: ", error);
      },
    });





// CREATE LAUNCHPAD
  const {
    data: createLaunchPadData,
    write: createLaunchPad,
    isLoading: createLaunchPadLoading,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: LaunchPadFacoryAddr(),
    abi: LPFactory,
    functionName: "createLaunchPad",
    args: [formData.RegId, formData.tokenAddress, formData.projectName, formData.Symbol, ethers.utils.parseEther(formData.LPTotalSupply ? String(formData.LPTotalSupply) : "0"), ethers.utils.parseEther(formData.PSTotalSupply ? String(formData.PSTotalSupply) : "0"), formData.LPDuration, formData.percentageIncrease],
  });

  const { data: createLaunchpadWaitData, isLoading: LaunchPadWaitDataLoading } =
    useWaitForTransaction({
      hash: createLaunchPadData?.hash,
      onSuccess(result) {
       toast("LaunchPad created succesfully");

      },
      onError(error) {
        console.log("Error: ", error);
        toast(`ERROR ${error}`);

      },
    });

  


  return (
      <div className={`${styles.body}`}>

          <Link href={`./requestlaunchpad`}>
        <div className={`${styles.changeForm} text-sm font-pop flex flex-row gap-4`}>
          <div className="h-[2.2rem] w-[2.2rem] rotate-[50deg]">
            <Image src={click} />
          </div>
          <div>
          <h1> REQUEST LAUNCHPAD </h1>
          </div>
        </div>
        </Link>
        <div className={styles.formdetails}>
          <h1 className={`font-EudoxusSansBold text-4xl mb-10`}>CREATE LAUNCHPAD </h1>
          <form onSubmit={handleSubmit} id="contact-field" className={`requestForm`} enctype="multipart/form-data">
            <div className={styles.names}>
            <div className={`flex flex-row text-base font-pop gap-9`}>
              <div>
                <label htmlFor="Name" className={styles.labels}>
                  Registration Id
                </label>
                <input
                  type="number"
                  placeholder="Enter Id issued by our Admin"
                  onChange={handleChange}
                  name="RegId"
                  value={formData.name}
                  className={styles.ownerName}
                />
              </div>

              <div>
                <label htmlFor="projectName" className={styles.labels}>
                  Project name
                </label>
                <input
                  type="text"
                  placeholder="Enter your Project Name"
                  onChange={handleChange}
                  name="projectName"
                  value={formData.projectName}
                  className={styles.projectName}
                />
              </div>
              </div>
            </div>
            <div className={`flex flex-row text-base font-pop gap-9`}>
            <div>
            <label htmlFor="Symbol" className={styles.labels}>
              Project Symbol
            </label>
            <input
              type="text"
              placeholder="Enter your Project Symbol"
              onChange={handleChange}
              name="Symbol"
              value={formData.Symbol}
              className={styles.emailInput}
            />
            </div>
              <div>
            <label htmlFor="tokenAddress" className={styles.labels}>
              Token Address
            </label>
            <input
              type="text"
              value={formData.tokenAddress}
              placeholder="Verified address of your token"
              onChange={handleChange}
              name="tokenAddress"
              className={styles.tokenAddress}
            />
            </div>
            </div>

            <div className={`flex flex-row text-base font-pop gap-9`}>
            <div>
            <label htmlFor="LPTotalSupply" className={styles.labels}>
              LaunchPad Total Supply
            </label>
            <input
              type="Number"
              value={formData.projectWebsite}
              placeholder="0.00"
              onChange={handleChange}
              name="LPTotalSupply"
              className={styles.projectTwitterHandle}
            />
            </div>
            <div>
            <label htmlFor="projectTwitter" className={styles.labels}>
              Presale Total Supply
            </label>
            <input
              type="Number"
              value={formData.PSTotalSupply}
              placeholder="0.00"
              onChange={handleChange}
              name="PSTotalSupply"
              className={styles.projectTwitterHandle}
            />
            </div>
            </div>

            <div className={`flex flex-row text-base font-pop gap-9`}>
            <div>
            <label htmlFor="LPDuration" className={styles.labels}>
              LaunchPad Duration
            </label>
            <input
              type="number"
              value={formData.LPDuration}
              placeholder="0"
              onChange={handleChange}
              name="LPDuration"
              className={styles.projectWebsite}
            />
            </div>
            <div>
            <label htmlFor="percentageIncrease" className={styles.labels}>
              Percentage Price Increase
            </label>
            <input
              type="number"
              value={formData.percentageIncrease}
              placeholder="0.00 %"
              onChange={handleChange}
              name="percentageIncrease"
              className={styles.projectTwitterHandle}
            />
            </div>
            </div>

            <div className="mb-5 gap-3 font-pop text-base">
            <input
              type="checkbox"
              id="agreement"
              checked={formData.agreement}
              onChange={handleChange}
              name="agreement"
            />
            <label className="agree-label" htmlFor="agreement">
              You agree to providing your data to Genesis Ignite who may contact
              you.
            </label>
            </div>

            <button className={` font-pop mt-4 ${styles.btnSubmit}`}>Create Lauchpad</button>
          </form>
        </div>
      </div>
  );
}
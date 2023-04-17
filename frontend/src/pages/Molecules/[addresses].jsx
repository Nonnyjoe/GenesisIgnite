import { erc20ABI, useContractRead, useContractReads, useAccount, useContractWrite, useWaitForTransaction} from 'wagmi'
import { useContext , useState } from 'react'
import LPFactoryABI from "../../utils/LPFactory.json"
import { useRouter } from 'next/router';
import PageLayout from "../../layout/PageLayout";
import LPABI from "../../utils/LPABI.json"
import tokenABI from "../../utils/token_ABI.json"
import {LaunchPadFacoryAddr} from "../../utils/addresses"
import {GeneAddress} from "../../utils/addresses"
import { ethers } from "ethers";


 const Launchpad = () => {
    const { address } = useAccount();
   const {addresses: contractAddress} = useRouter().query;
    const DropdownOptions2 = [{id:0, name: 'GENE', address:"0x8717F0F7D4b06a52Aa2484b33DA1b6ea13519a6E" }];
    const LaunchPadFactory = LaunchPadFacoryAddr();
    const geneAddress = GeneAddress();
    const [LaunchPadData, setLaunchPadData] = useState({});
    const [option, setOption] = useState("");
    const [Amount, setAmount] = useState(0);
    const [noOfLaunchPadContributors, setNoOfLaunchPadContributors] = useState(null);
  const [genesRaisedFromLaunchPad, setGenesRaisedFromLaunchPad] = useState(null);
  const [presaleTokenBalance, setPresaleTokenBalance] = useState(null);
  const [genesDepositedByUser, setGenesDepositedByUser] = useState(null);
  const [userAllowance, setUserAllowance] = useState( );
  const [UserBalance, setUserBalance] = useState( );


const { data:BuyersData, isError, isLoading } = useContractRead({
    address: LaunchPadFactory,
    abi: LPFactoryABI,
    functionName: 'displayTokenDetails',
    args:[contractAddress],
    onSuccess(data){
    setLaunchPadData(data);
    }
  })

  function handleSubmit(e) {
    e.preventDefault();
    console.log("user Allowance"+ userAllowance)
    if(userAllowance < (Amount * 10**18)){
      getAlawee?.();
    }else {
      getParticipate?.();
    }

  }
  function handleSubmit2b(){
    getParticipate?.();
  }
// console.log(`contract:`+ contractAddress);
// const getContractBalance = {
//   address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
//   abi: wagmigotchiABI,
// }
// const getDetails = {
//   address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
//   abi: mlootABI,
// }

  //// CHECK THE ALLOWANCE THE USER HAS GRANTED THE CONTRACT
    useContractRead({
        address: geneAddress,
        abi: tokenABI,
        functionName: 'allowance',
        args: [address, contractAddress],
        watch: true,
        onSuccess(data) {
            setUserAllowance(Number(data))
        }
    })

    // GRANT ALLOWANCE
    const { data: alawee, write: getAlawee, isLoading:alaweeLoading } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: geneAddress,
    abi: tokenABI,
    functionName: "approve",
    args: [contractAddress, ethers.utils.parseEther(String(Amount)?? "0")],

  });

   const { data: alaweeWaitData, isLoading:loadingAlaweeWaitData } = useWaitForTransaction({
    hash: alawee?.hash,
    onSuccess(result) {
     handleSubmit2b();
    },
    onError(error) {
      console.log("Error: ", error);
    },
  })

  /// MAIN INTEGRATION TO PARTICIPATE IN LAUNCHPAD
  const { data: participate, write: getParticipate, isLoading: participateLoading } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: contractAddress,
    abi: LPABI,
    functionName: "participateInLaunchPad",
    args: [ethers.utils.parseEther(String(Amount)?? "0")],

  });

   const { data: participateWaitData, isLoading:loadingParticipateWaitData } = useWaitForTransaction({
    hash: participate?.hash,
    onSuccess(result) {
    },
    onError(error) {
      console.log("Error: ", error);
    },
  })

// function to read contract details from blockchain
const { data: LPData, isError: ReadsError, isLoading: ReadsLoading } = useContractReads({
    contracts: [
      {
        address: contractAddress,
        abi: LPABI,
        functionName: 'displayNoOfLaunchPadContributors',
      },
      {
        address: contractAddress,
        abi: LPABI,
        functionName: 'viewGenesRaisedFromLaunchPad',
      },
      {
        address: contractAddress,
        abi: LPABI,
        functionName: 'viewPresaleTokenBalance',
      },
      {
        address: contractAddress,
        abi: LPABI,
        functionName: 'getGenesDepositedByUser',
        args:[address],
      },
      {
        address: geneAddress,
        abi: tokenABI,
        functionName: 'balanceOf',
        args:[address],
      },
    ],
      watch: true,
      onSuccess: (data) => {
      setNoOfLaunchPadContributors((data[0]).toString());
      setGenesRaisedFromLaunchPad((data[1]).toString());
      setPresaleTokenBalance((data[2].toString()));
      setGenesDepositedByUser((data[3]).toString());
      setUserBalance((data[4]).toString())
  }})


  // if (readsLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (readsError) {
  //   return <div>Error: {readsError.message}</div>;
  // }


    
    return (
      
      // <div className="p-4 aspect-square group cursor-pointer relative flex rounded-2xl bg-zinc-50 transition-shadow hover:shadow-md hover:shadow-zinc-900/5">
            // <div>
            //     <div className="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50"><svg aria-hidden="true" className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/[0.02] stroke-black/5 dark:fill-white/1"><defs><pattern id=":R56hd6:" width="72" height="56" patternUnits="userSpaceOnUse" x="50%" y="16"><path d="M.5 56V.5H72" fill="none"></path></pattern></defs><rect width="100%" height="100%" strokeWidth="0" fill="url(#:R56hd6:)"></rect><svg x="50%" y="16" class="overflow-visible"><rect strokeWidth="0" width="73" height="57" x="0" y="56"></rect><rect strokeWidth="0" width="73" height="57" x="72" y="168"></rect></svg></svg></div>
            // </div>
        <PageLayout>
        <div className= 'mt-4 ml-4 flex flex-row justify-around'>
             <div className='  '>
                 <p className="font-semibold leading-7 text-zinc-900 uppercase">TOKEN NAME: {LaunchPadData.name}</p>
                 <p className="mt-4 text-zinc-900 font-semibold">TOKEN SYMBOL: {LaunchPadData.symbol}</p>
                 <p className="mt-4 text-zinc-900 font-semibold">LAUNCHPAD FUNDS: {`000,0000`}</p>
                  <p className="mt-4 text-zinc-900 font-semibold">No of launchpad contributors: {noOfLaunchPadContributors}</p>
                  <p className="mt-4 text-zinc-900 font-semibold">Genes deposited by user: {genesDepositedByUser}</p>
                  <p className="mt-4 text-zinc-900 font-semibold">GENESIS IGNITE TOKENS RAISED : {genesRaisedFromLaunchPad}</p>
                  <p className="mt-4 text-zinc-900 font-semibold">PRESALE BUDGET: {presaleTokenBalance / (10**18)}</p>
                  <p className="mt-4 text-zinc-900 font-semibold">USER CURRENT IGN BALANCE: {UserBalance / (10**18)}</p>

                 {/* <p className=" text-zinc-300 ">{`${contractAddress.slice(0, 4)}...${contractAddress.slice(-4)}`}</p> */}
                  {/* <p>{ cardData[2] } </p> */}
             </div>
              <div className="flex items-center justify-center h- h-screen ">
        <form onSubmit={handleSubmit}>
            <div className="justify-center border border-teal-500 p-10 bg-gray-200 text-gray-800 rounded-lg flex flex-col gap-5 top-[-20%] shadow-md">
            <p> PARTICIPATE IN CURRENT LAUNCHPAD </p>

             <label htmlFor="option">Participate With: </label>
            <select id="option" value={option}>
              {DropdownOptions2.map((option) => (
                <option key={option.id} value={option.address}>
                  {option.name}
                </option>
              ))}
            </select>
            <br/>
            <label className="block">Amount</label>
            <input
                id="string"
                type="Any"
                placeholder="0.00"
                className="p-3 border border-teal-500 rounded-lg"
                onChange={(e) => {
                setAmount(Number(e.target.value));
                console.log(Amount);
                }}
            />
            <br/>
            <button
            type="submit"
            className="py-3 px-8 bg-green-600 border border-green-100 font-semibold rounded-lg"
            >
            {alaweeLoading || loadingAlaweeWaitData || participateLoading || loadingParticipateWaitData ? "LOADING...." : "PARTICIPATE"}
            </button>
          </div>
        </form>
            </div>
            </div>
    </PageLayout>
            // </div>   
        
      
  )
}

export default Launchpad;
import { erc20ABI, useContractRead } from 'wagmi'
import { useContext , useState } from 'react'
import LPFactoryABI from "../../utils/LPFactory.json"
import {LaunchPadFacoryAddr} from "../../utils/addresses";
import Link from 'next/link';

// import PageLayout from "../../layout/PageLayoutt";



export const Launchpads = ({ contractAddress }) => {
    const [LaunchPadData, setLaunchPadData] = useState({});

const { data:BuyersData, isError, isLoading } = useContractRead({
    address: LaunchPadFacoryAddr(),
    abi: LPFactoryABI,
    functionName: 'displayTokenDetails',
    args:[contractAddress],
    onSuccess(data){
    setLaunchPadData(data);
    console.log(data);
    }
  })
  console.log(contractAddress);
    
    return (
            <Link href={`./Molecules/${contractAddress}`}>
                <div className="p-4 aspect-square group cursor-pointer relative flex rounded-2xl bg-zinc-50 transition-shadow hover:shadow-md hover:shadow-zinc-900/5">
            <div>
                <div className="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50"><svg aria-hidden="true" className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/[0.02] stroke-black/5 dark:fill-white/1"><defs><pattern id=":R56hd6:" width="72" height="56" patternUnits="userSpaceOnUse" x="50%" y="16"><path d="M.5 56V.5H72" fill="none"></path></pattern></defs><rect width="100%" height="100%" strokeWidth="0" fill="url(#:R56hd6:)"></rect><svg x="50%" y="16" class="overflow-visible"><rect strokeWidth="0" width="73" height="57" x="0" y="56"></rect><rect strokeWidth="0" width="73" height="57" x="72" y="168"></rect></svg></svg></div>
            </div>
            <div className='  '>
                <p className="text-sm font-semibold leading-7 text-zinc-900 uppercase">{LaunchPadData.name}</p>
                <p className="mt-4 text-zinc-900 font-semibold">{LaunchPadData.symbol}</p>
                <p className=" text-zinc-300 ">{`${contractAddress.slice(0, 4)}...${contractAddress.slice(-4)}`}</p>
                {/* <p>{ cardData[2] } </p> */}
            </div>
            </div>      
            </Link>
         
      
  )
}
import { erc20ABI, useContractRead, useContractReads, useAccount, useContractWrite, useWaitForTransaction} from 'wagmi'
import { useContext , useState } from 'react'
import LPFactoryABI from "../../utils/LPFactory.json"
import { useRouter } from 'next/router';
import PageLayout from "../../layout/PageLayout";
import LPABI from "../../utils/LPABI.json"
import tokenABI from "../../utils/token_ABI.json"
import { ethers } from "ethers";

export const LaunchpadDetails = ({ contractAddress }) => {}
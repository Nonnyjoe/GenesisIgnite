import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/sideBar";
import styles from "../../../styles/dashboard2.module.css";
// import Vote from "./vote";
import { useRouter } from 'next/router';
import ProposalForm from "./form";


export default function DaoHome() {


const router = useRouter();
   const { address } = router.query;
   const data = JSON.stringify(router.query);
// 
//   console.log(`exscowwwwwww` +` ` +  data.addId + data.type);

  return (
    <div className={`${styles.container} h-[100vh] pt-4`}>
      <Navbar />
      <div className="flex flex-row mt-10 gap-11">
        <Sidebar check={6} />
        <ProposalForm contractAddress={address}/>
        {/* <Vote pad={pad} proposalID={proposalID} /> */}
      </div>
    </div>
  );
}

import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/sideBar";
import styles from "../../../styles/dashboard2.module.css";
import Vote from "./vote";
import { useRouter } from 'next/router';
import { ToastContainer } from "react-toastify";


export default function DaoHome() {


const router = useRouter();
   const { pad, proposalID } = router.query;
   const data = JSON.stringify(router.query);
//   console.log(`exscowwwwwww` +` ` +  data.addId + data.type);
  console.log(`exscMMMMMMM` + JSON.stringify(proposalID))
  console.log(`exscMMMMMMM22` + JSON.stringify(pad))
  console.log(`exscMMMMMMM22` + data)

  return (
    <div className={`${styles.container} h-[100vh] pt-4`}>
      <Navbar />
      <div className="flex flex-row mt-10 gap-11">
        <Sidebar check={6} />
           <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            />        
        <Vote pad={pad} proposalID={proposalID} />
      </div>
    </div>
  );
}

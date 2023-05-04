import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/sideBar";
import styles from "../../../styles/dashboard2.module.css"
import FillOrder from "./fillAdd";
import { useRouter } from 'next/router';
import { data } from "autoprefixer";
import { ToastContainer } from "react-toastify";
// import Dcontents from "./Dcontents";
// import Addss from "./addss";



export default function Dashboard(){
const router = useRouter();
   const { addId, type } = router.query;
   const data = JSON.stringify(router.query);
//   console.log(`exscowwwwwww` +` ` +  data.addId + data.type);
  console.log(`exscMMMMMMM` + JSON.stringify(router.query))



    return(
    <div className={`${styles.container} h-[100vh] pt-4`}>
        <Navbar />
        <div className="flex flex-row mt-10 gap-11">
            <Sidebar check={5}/>
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
            <FillOrder escrowId = {addId} Tstatus = {type} />
        </div>

    </div>
    )
}
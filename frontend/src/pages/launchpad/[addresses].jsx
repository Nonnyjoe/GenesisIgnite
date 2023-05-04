import Navbar from "../../components/Navbar";
import Sidebar from "../../components/sideBar";
import styles from "../../styles/dashboard2.module.css"
import { useRouter } from "next/router";
import LaunchPadDetails from "./LaunchPadDetails"
import { ToastContainer } from "react-toastify";



const SelectedLaunchpad = () => {
  const { addresses: contractAddress } = useRouter().query;
  
 return(
    <div className={`${styles.container} h-[100vh] pt-4`}>
        <Navbar />
        <div className="flex flex-row mt-10 gap-11">
            <Sidebar check={3}/>
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
            <LaunchPadDetails contractAddress={contractAddress}  />
           
        </div>

    </div>
    )
};

export default SelectedLaunchpad;

import { ToastContainer } from "react-toastify";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/sideBar";
import styles from "../../../styles/dashboard2.module.css"
import CreateAdds from "./createAdds";
// import styles from "../../../styles/"
// import Dcontents from "./Dcontents";
// import Addss from "./addss";



export default function CreateAd(){
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
            <CreateAdds />
            
            {/* <Addss /> */}
        </div>

    </div>
    )
}
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/sideBar";
import styles from "../../../styles/dashboard2.module.css"
import CreateLaunchpad from "./create"



export default function CreatePad(){
    return(
    <div className={`${styles.container} h-[100vh] pt-4`}>
        <Navbar />
        <div className="flex flex-row mt-10 gap-11">
            <Sidebar check={3} />
            <CreateLaunchpad />
        </div>

    </div>
    )
}
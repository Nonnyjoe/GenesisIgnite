import Navbar from "../../components/Navbar";
import Sidebar from "../../components/sideBar";
import styles from "../../styles/dashboard2.module.css"
import Presale from "./Presale"



export default function PresaleHome(){
    return(
    <div className={`${styles.container} h-[100vh] pt-4`}>
        <Navbar />
        <div className="flex flex-row mt-10 gap-11">
            <Sidebar check={4}/>
            <Presale />
        </div>

    </div>
    )
}
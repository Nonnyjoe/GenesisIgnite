import Navbar from "../../components/Navbar";
import Sidebar from "../../components/sideBar";
import styles from "../../styles/dashboard2.module.css"
// import Dcontents from "./Dcontents";
import Addss from "./addss";



export default function Dashboard(){
    return(
    <div className={`${styles.container} h-[100vh] pt-4`}>
        <Navbar />
        <div className="flex flex-row mt-10 gap-11">
            <Sidebar check={5}/>
            <Addss />
        </div>

    </div>
    )
}
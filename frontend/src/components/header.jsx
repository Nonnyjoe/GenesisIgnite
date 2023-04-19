import Link from "next/link";
import { ConnectButton} from '@rainbow-me/rainbowkit';
import styles from "../styles/Header.module.css"
import Image from "next/image";
import ignitelogo from "../images/web2.png"

export default function Header(){
    return(
        <div className={styles.header}>
            <div className={styles.Image}><Image  src={ignitelogo} alt= "iginite logo"/></div>
            
            <nav className= {styles.navi}>
                <Link href="/">Home</Link>
                <Link href="/documentation">Documentation</Link>
                <Link href="/dashboard">dashboard</Link>
                <Link href="/swapPad">swapPad</Link>
                <Link href="/launchpad">Launchpad</Link>
                <Link href="/Presale">Presales</Link>
            </nav>
            <ConnectButton />
        </div>
    )
}